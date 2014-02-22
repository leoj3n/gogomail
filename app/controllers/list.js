var mongoose = require('mongoose'),
  Email = mongoose.model('Email');

//
// Lists all emails currently in the database.
//

exports.index = function( req, res ) {
  if ( req.query.pass === process.env.NODE_EMAIL_PASS ) {
    Email.find(function( err, emails ) {
      if ( err ) {
        throw new Error(err);
      }

      res.render( 'list/index', {
        title: 'Email List &bull; GoGo Mail',
        emails: emails
      });
    });
  } else {
    res.redirect('/');
  }
};

