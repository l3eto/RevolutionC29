var content = [
    { title: 'Andorra' , description:'xxxxxxxaaa' , key:'asdasd'},
    { title: 'United Arab Emirates' , description:'zzzzzz' , key:'111' }
  ];

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
    };

//get content
  function getContent(){
    var data = [];
    readXML("../uploads/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    var songs = xmlDoc.getElementsByTagName("artist");
    if( songs.length > 0 ){
        for( var i = 0 ; i < songs.length ; i++){
            console.log( songs[i] );
        }
    }
    });
    return data;
  }

$( document ).ready(function() {
   /* 
  readXML("../uploads/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
  
  var songs = xmlDoc.getElementsByTagName("event");
  console.log(songs);*/
  /*if( events.length > 0 ){
    for (var i = 0; i < events.length; i++) {
    
    }
  }*/
    
 // });
 
  
  //search
  $('.ui.search').search({source: getContent() });

});
