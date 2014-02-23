var FeedParser = require('feedparser'),
  request = require('request'),
  _counter = 1,
  _target,
  _limit = 4;

exports.index = function( req, res ) {
  var feeds = req.body.feeds,
    responseData = {
        data: []
      };

  for ( var i = 0; i < feeds.length; i++ ) {
    parseFeed(feeds[ i ]);
  }

  _target = ( feeds.length * _limit );

  // function parseFeeds( feeds ) {
  //   return Promise.all(
  //     feeds.map(function( name ) {
  //       return parseFeed(name);
  //     })
  //   );
  // }

  // parseFeeds(feeds).done(function( feedContents ) {
  //   console.log(feedContents);
  //   res.json(responseData);
  // });

  function parseFeed( feed ) {
    var feedparser = new FeedParser();
    var req = request(feed);
    var i = 0;

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
      var stream = this
        , meta = this.meta
        , item;

      while ( ( item = stream.read() ) && ( i++ < _limit ) ) {
        responseData.data.push(item.title);

        if (_counter++ == ( _target - 1 )) {
          res.json(responseData);
        }
      }
    });
  }

};

