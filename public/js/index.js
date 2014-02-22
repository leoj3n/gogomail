var app = function(vimeoId) {

  //
  // Set application variables
  //

 var $html = $('html'),
    $window = $(window);

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

  if ( Hammer.HAS_TOUCHEVENTS ) {
    $container.hammer( { drag_lock_to_axis: true } );
    _.tap( $html, 'a,button,[data-tap]' );
  }

  $html.addClass( Hammer.HAS_TOUCHEVENTS ? 'touch' : 'mouse' );

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
  // Details
  //

  Visibility.onVisible(function() {
    // ...
  });

  $email.verimail({
    messageElement: 'p#status-message'
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
};

