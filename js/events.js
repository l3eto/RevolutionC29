$( document ).ready(function() {
  
  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
  console.log('lol');
  //usage:
  readTextFile("../js/events.json", function(text){
    console.log('lol3');
      var data = JSON.parse(text);
      console.log(data);
  });
  console.log('lol2');
  
  
  //read xml
  function readXML(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/xml");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
  }
  readXML("../js/events.xml", function(text){
    console.log('lol4');
      var data = JSON.parse(text);
      console.log(data);
  });
  

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
