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

  $.post( 'rss', {
    feeds: {
      wsj: 'http://online.wsj.com/xml/rss/3_7031.xml',
      espn: 'http://sports.espn.go.com/espn/rss/news',
      people: 'http://feeds.people.com/people/headlines',
      cnn: 'http://rss.cnn.com/rss/cnn_topstories.rss',
      reuters: 'http://feeds.reuters.com/news/artsculture'
    }
  }, function( result ) {
    $.each( result, function( i, v ) {
      var $tab = $('#'+i);

      $tab.html('<div class="list-group"></div>');

      var $sel = $('div', $tab.get(0));

      $.each( v, function( i2, v2 ) {
        $sel.append( '<a href="#" class="list-group-item">' +
          '<h4 class="list-group-item-heading">' + v2.title + '</h4>' +
          '<p class="list-group-item-text">' + v2.summary.substring(0, 70) +
          '...</p></a></div>' );
      });
    });
  });

  //
  // Email
  //

  $.post( 'mail', {
    email: $('#inputEmail1').val(),
    pass: $('#inputPassword1').val()
  }, function( result ) {
    var $emails = $('#emails');

    $email.html('');

    $.each( result.listing, function( i, v ) {
      $emails.append(v + '<br>');
    });
  });

};

