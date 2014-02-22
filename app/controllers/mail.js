var mongoose = require('mongoose'),
  Email = mongoose.model('Email');

exports.register = function( req, res ) {
  var newEmail = req.body.email,
    newPass = req.body.email,
    email = new Email( { email: newEmail } ),
    subjects;

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

  //
  // TODO: SMTP request code
  //

  //
  // Send success message
  //

  res.render( 'mail/index', {
     title: 'Your Email Subjects &bull; GoGo Mail',
     subject: subjects
   });
};
