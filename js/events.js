$( document ).ready(function() {
  
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
  readXML("../js/events.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
  
  var events = xmlDoc.getElementsByTagName("event");
  var containerDIV = document.getElementById("events-container");
  if( events.length > 0 ){
    for (var i = 0; i < events.length; i++) { 
      //crear main div
      var mainDIV = document.createElement('DIV');
      mainDIV.setAttribute("class","item rev-publish");
      
      //set image
      var imgDIV = document.createElement('DIV');
      imgDIV.setAttribute("class","ui medium image rev-img");
      var img = document.createElement('IMG');
      img.setAttribute("class","rev-img");
      img.src = events[i].getElementsByTagName("src");
      imgDIV.appendChild(img);
      
      //append to main DIV
      mainDIV.appendChild(imgDIV);
      
      //set text
      var txtDIV = document.createElement('DIV');
      txtDIV.setAttribute("class","top aligned content");
      
      //header
      var headerDIV = document.createElement('DIV');
      headerDIV.setAttribute("class","header");
      headerDIV.innerHTML = events[i].getElementsByTagName("header");
      txtDIV.appendChild(headerDIV);
      
      //meta
      var metaDIV = document.createElement('DIV');
      metaDIV.setAttribute("class","meta");
      var SPAN = document.createElement('DIV');
      SPAN.setAttribute("class","date");
      SPAN.innerHTML = events[i].getElementsByTagName("date");
      metaDIV.appendChild(SPAN);
      txtDIV.appendChild(metaDIV);
      
      //description
      var descriptionDIV = document.createElement('DIV');
      descriptionDIV.setAttribute("class","description");
      descriptionDIV.innerHTML = "<p>"+events[i].getElementsByTagName("info")+"<br>"+events[i].getElementsByTagName("alert")+"</p>"+"<p>Lugar: "+events[i].getElementsByTagName("location")+"<br>Hora: "+events[i].getElementsByTagName("hour")+"</p>";
      txtDIV.appendChild(descriptionDIV);
      
      //extra info
      var extraDIV = document.createElement('DIV');
      extraDIV.setAttribute("class","ui extra");
      var extrainfoDIV = document.createElement('DIV');
      var SPAN = document.createElement('SPAN');
      SPAN.innerHTML = "Ver en publicación :";
      extrainfoDIV.appendChild(SPAN);
      var BUTTON = document.createElement('BUTTON');
      BUTTON.setAttribute("class","ui circular facebook icon button");
      var ICON = document.createElement('I');
      ICON.setAttribute("class","facebook icon");
      BUTTON.appendChild(ICON);
      extrainfoDIV.appendChild(BUTTON);
      var BUTTON = document.createElement('BUTTON');
      BUTTON.setAttribute("class","ui circular instagram icon button");
      var ICON = document.createElement('I');
      ICON.setAttribute("class","instagram icon");
      BUTTON.appendChild(ICON);
      extrainfoDIV.appendChild(BUTTON);
      extraDIV.appendChild(extrainfoDIV);
      txtDIV.appendChild(extraDIV);
      
      //set to main DIV
      mainDIV.appendChild(txtDIV);
      
      //append to main DIV
      containerDIV.appendChild(mainDIV);
    }
  }
    
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
