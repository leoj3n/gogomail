var FeedParser = require('feedparser'),
  request = require('request'),
  _ = require('underscore'),
  Promise = require('promise');

exports.index = function( req, res ) {
  var feeds = req.body.feeds,
    articleLimit = 4,
    all = [];

  _.each( feeds, function( value, key, list ) {
    all.push(parseFeed( key, value ));
  });

  Promise.all(all).done(function( result ) {
    var flatResult = {};

    for ( var i = 0; i < result.length; i++ ) {
      _.extend(flatResult, result[i]);
    }

    res.json(flatResult);
  });

  function parseFeed( name, url ) {
    return new Promise(function( resolve, reject ) {
      var feedparser = new FeedParser();
      var urlReq = request(url);
      var i = 0,
        responseData = {};

      responseData[ name ] = [];

      urlReq.on( 'error', function( error ) {
        // handle any request errors
      });

      urlReq.on( 'response', function( urlRes ) {
        var stream = this;

        if ( urlRes.statusCode != 200 ) {
          return this.emit( 'error', new Error('Bad status code') );
        }

        stream.pipe(feedparser);
      });

      feedparser.on( 'error', function( error ) {
        // always handle errors
      });

      feedparser.on( 'readable', function() {
        var stream = this,
          meta = this.meta,
          item;

        while ( ( item = stream.read() ) && ( i++ < articleLimit ) ) {
          // console.log(item);
          responseData[ name ].push({
            title: item.title,
            summary: item.summary
          });
        }

        if ( i == articleLimit ) {
          resolve(responseData);
        }
      });
    });
  }

};

