module.exports = function( app ) {

  // home route
  var home = require('../app/controllers/home');
  app.get( '/', home.index );

  // mail route
  // TODO: use POST data...
  var mail = require('../app/controllers/mail');
  app.post( '/mail', mail.register );

  // rss route
  // TODO: use POST data...
  var rss = require('../app/controllers/rss');
  app.post( '/rss', rss.index );

  // email list route
  var list = require('../app/controllers/list');
  app.get( '/list', list.index );

};
