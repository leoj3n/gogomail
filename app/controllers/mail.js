var mongoose = require('mongoose'),
  Email = mongoose.model('Email');

exports.register = function( req, res ) {
  var email = new Email( { email: req.params.newEmail } );

  email.save(function( err ) {

    //
    // Abort if there was an error saving the email
    //

    if ( err ) {
      console.log(err);
      res.send(err);
      return;
    }

  });

  //
  // Send success message
  //

  // TODO: Render a view
  res.send('REGISTERED!');
};
