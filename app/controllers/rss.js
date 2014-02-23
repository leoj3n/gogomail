var FeedParser = require('feedparser'),
  request = require('request'),
  Promise = require('promise');

exports.index = function( req, res ) {
  var feeds = req.body.feeds,
    articleLimit = 4,
    all = [],
    responseData = {};

  // for ( var i = 0; i < feeds.length; i++ ) {
  for ( var feed in feeds ) {
    // console.log( feed, feeds[ feed ] );
    all.push(parseFeed( feed, feeds[ feed ] ));
    console.log(feed);
  }

  Promise.all(all).done(function( result ) {
    // console.log(result);
    // res.json(result);
  });

  function parseFeed( name, url ) {
    return new Promise(function( resolve, reject ) {
      var feedparser = new FeedParser();
      var req = request(url);
      var i = 0;

      responseData[ name ] = [];

      req.on( 'error', function( error ) {
        // handle any request errors
      });

      req.on( 'response', function( res ) {
        var stream = this;

        if ( res.statusCode != 200 ) {
          return this.emit( 'error', new Error('Bad status code') );
        }

        stream.pipe(feedparser);
      });

      feedparser.on( 'error', function( error ) {
        // always handle errors
      });

      feedparser.on( 'readable', function() {
        // This is where the action is!
        var stream = this,
          meta = this.meta,
          item;

        while ( ( item = stream.read() ) && ( i++ < articleLimit ) ) {
          responseData[ name ].push(item.title);
        }

        if ( i == articleLimit ) {
          resolve(responseData);
        }
      });
    });
  }

};

