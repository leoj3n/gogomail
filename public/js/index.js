var app = function(vimeoId) {

  //
  // Set application variables
  //

 var $html = $('html'),
    $window = $(window),
    $email = $('.email-input'),
    $statusmsg = $('span.status-message'),
    $rss = $('#rss');

  //
  // Hide mobile browser menu
  //

  setTimeout( function() {
    $window.scrollTop(0);
  }, 0 );

  //
  // Add touch functionality
  //

  FastClick.attach(document.body);

  //
  // Resize handler
  //

  $(window).on( 'resize scroll',
    _.debounce(function() {
      var width = $window.width(),
        height = $window.height();
    }, 200 )
  ).resize();

  //
  // Visibility API example
  //

  Visibility.onVisible(function() {
    // ...
  });

  //
  // Email login
  //

  $email.verimail({
    messageElement: 'span.status-message'
  });

  $email.focus(function() {
    $statusmsg.fadeIn('slow');
  });

  $statusmsg.hide().click(function() {
    $email.focus();
  });

  /*$('form#mail').submit(function( e ) {
    var email = $email.val(),
      url = 'mail/' + email;

    if ( email !== '' ) {
      $.get( url, function( data ) {
        if (data === 'mail found') {
          // success
        } else {
          // failed
        }
      }).fail(function() {
        // failed
      });
    }

    e.preventDefault();
  });*/

  //
  // RSS feeds
  //

  $rss.html('<ul></ul>');

  $.post( 'rss', {
    feeds: {
      wsj: 'http://online.wsj.com/xml/rss/3_7031.xml',
      espn: 'http://sports.espn.go.com/espn/rss/news',
      'http://feeds.people.com/people/headlines',
      'http://rss.cnn.com/rss/cnn_topstories.rss',
      'http://feeds.reuters.com/news/artsculture'
    }
  }, function( result ) {
    $.each( result.data, function( i, v ) {
      $('ul', $rss).append('<li>' + v + '</li>');
      // console.log(v);
    });
  });

};

