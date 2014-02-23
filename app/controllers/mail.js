var mongoose = require('mongoose'),
  Email = mongoose.model('Email'),
  Imap = require('imap'),
  inspect = require('util').inspect;

exports.register = function( req, res ) {
  var newEmail = req.body.email,
    newPass = req.body.password,
    email = new Email( { email: newEmail } ),
    subjects = {},
    imap = new Imap({
      user: newEmail,
      password: newPass,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    }),
    emails = [];

  //
  // Save the email to MongoDB
  //

  // email.save(function( err ) {

  //   //
  //   // Abort if there was an error saving the email
  //   //

  //   if ( err ) {
  //     console.log(err);
  //     res.send(err);
  //     return;
  //   }

  // });

  function openInbox( cb ) {
    imap.openBox( 'INBOX', true, cb );
  }

  imap.once( 'ready', function() {
    openInbox(function( err, box ) {
      if ( err ) {
        throw err;
      }

      var f = imap.seq.fetch(
        '1:3',
        {
          bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          struct: true
        }
      );

      f.on( 'message', function( msg, seqno ) {
        console.log( 'Message #%d', seqno );

        var prefix = '(#' + seqno + ') ';

        msg.on( 'body', function( stream, info ) {
          var buffer = '';

          stream.on( 'data', function( chunk ) {
            buffer += chunk.toString('utf8');
          });

          stream.once( 'end', function() {
            emails.push(Imap.parseHeader(buffer));
            // console.log( ( prefix + 'Parsed header: %s' ), obj );
          });
        });

        /*msg.once( 'attributes', function( attrs ) {
          console.log( prefix + 'Attributes: %s', inspect( attrs, false, 8 ) );
        });*/

        msg.once( 'end', function() {
          console.log( prefix + 'Finished' );
        });
      });

      f.once( 'error', function( err ) {
        console.log( 'Fetch error: ' + err );
      });

      f.once( 'end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });

    });
  });

  imap.once( 'error', function( err ) {
    console.log( err );
  });

  imap.once( 'end', function() {
    console.log('Connection ended');
    console.log(typeof emails);
    console.log(emails[0].subject[0]);

    res.json(emails);
  });

  imap.connect();
};
