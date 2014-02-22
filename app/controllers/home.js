//
// Renders the Home page.
//

exports.index = function( req, res ) {
  res.render( 'home/index', {
    title: 'Home &bull; GoGo Mail'
  });
};
