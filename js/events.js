$( document ).ready(function() {
  
  function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "events.xml", true);
    xmlhttp.send();
  }
  function myFunction(xml) {
    console.log(xml);
  }

  $('#rev-28-05-16').find('.ui.circular.facebook.icon.button').click( function(){
      var win = window.open( 'https://www.facebook.com/revolutionc29/photos/a.1424212441144767.1073741828.1424015387831139/1780890342143640/', '_blank');
      win.focus();
  });
  $('#rev-28-05-16').find('.ui.circular.instagram.icon.button').click( function(){
      var win = window.open( 'https://www.instagram.com/p/BF81RsNykOn/', '_blank');
      win.focus();
  });

  $('#rev-21-05-16').find('.ui.circular.facebook.icon.button').click( function(){
      var win = window.open( 'https://www.facebook.com/revolutionc29/photos/a.1424212441144767.1073741828.1424015387831139/1778284352404239/', '_blank');
      win.focus();
  });
  $('#rev-21-05-16').find('.ui.circular.instagram.icon.button').click( function(){
      var win = window.open( 'https://www.instagram.com/p/BFqfwf8SkEF/', '_blank');
      win.focus();
  });

  $('#rev-07-05-16').find('.ui.circular.facebook.icon.button').click( function(){
      var win = window.open( 'https://www.facebook.com/revolutionc29/photos/a.1424212441144767.1073741828.1424015387831139/1773279912904683/', '_blank');
      win.focus();
  });
  $('#rev-07-05-16').find('.ui.circular.instagram.icon.button').click( function(){
      var win = window.open( 'https://www.instagram.com/p/BFG0SegykI-/', '_blank');
      win.focus();
  });

  $('#rev-30-04-16').find('.ui.circular.facebook.icon.button').click( function(){
      var win = window.open( 'https://www.facebook.com/revolutionc29/photos/a.1424212441144767.1073741828.1424015387831139/1769313223301352/', '_blank');
      win.focus();
  });
  $('#rev-30-04-16').find('.ui.circular.instagram.icon.button').click( function(){
      var win = window.open( 'https://www.instagram.com/p/BEtfBrVykHI/', '_blank');
      win.focus();
  });

  $('#rev-23-04-16').find('.ui.circular.facebook.icon.button').click( function(){
      var win = window.open( 'https://www.facebook.com/revolutionc29/photos/a.1424212441144767.1073741828.1424015387831139/1766580310241310/', '_blank');
      win.focus();
  });
  $('#rev-23-04-16').find('.ui.circular.instagram.icon.button').click( function(){
      var win = window.open( 'https://www.instagram.com/p/BEcA0r4SkLW/', '_blank');
      win.focus();
  });

});
