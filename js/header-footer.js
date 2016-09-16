$( document ).ready(function() {

  $('.mobile-container.home-link').click( function(){
    window.location.href = '../home/'
  });

  $('.mobile-container.worship-link').click( function(){
    window.location.href = '../worship/';
  });

  $('.mobile-container.events-link').click( function(){
    window.location.href = '../events/';
  });

  $('.mobile-container.language-link').click( function(){
    window.location.href = '../search/';
  });

  $('.rounded.big.square.icon').hover(function(){
      $(this).addClass('activeicon');
      },function(){
      $(this).removeClass('activeicon');
  });

  $('#facebook-link').click(function(){
    var win = window.open( 'https://www.facebook.com/revolutionc29/', '_blank');
    win.focus();
  })
  $('#instagram-link').click(function(){
    var win = window.open( 'https://www.instagram.com/revolutionc29/', '_blank');
    win.focus();
  })

});
