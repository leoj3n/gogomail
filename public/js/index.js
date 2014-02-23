var app = function(vimeoId) {

  //
  // Set application variables
  //

 var $html = $('html'),
    $window = $(window),
    $email = $('#inputEmail1'),
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
  // Show buy modal when trying to click link
  //

  $(document).on( 'click', 'a.list-group-item', function() {
    $('#buyModal').modal('show');
  });

  //
  // Email login
  //

  $email.verimail({
    messageElement: '#emailStatus'
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

  $('#emails form').submit(function( e ) {
    $.post( 'mail', {
      email: $email.val(),
      password: $('#inputPassword1').val()
    }, function( result ) {
      console.log( result );

      var $emails = $('#emails');

      $emails.html('<div class="list-group"></div>');

      var $sel = $('div', $emails.get(0));

      $.each( result, function( i, v ) {
        console.log(v);
        $sel.append('<a href="#" class="list-group-item">' +
          '<h4 class="list-group-item-heading">' + v.subject[0] + '</h4>' +
          '<p class="list-group-item-text">' + v.date[0] +
          '</p></a></div>');
      });
    });

    e.preventDefault();
  });

};

