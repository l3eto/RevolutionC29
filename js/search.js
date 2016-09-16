var content = [
    { title: 'Andorra' , description:'xxxxxxxaaa' },
    { title: 'United Arab Emirates' , description:'zzzzzz' }
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
    var artist = xmlDoc.getElementsByTagName("artist");
    if( artist.length > 0 ){
        for( var i = 0 ; i < artist.length ; i++){
            var artistname = artist[i].getAttribute("name");
            var songs = artist[i].getElementsByTagName("song");
            if( songs.length > 0 ){
                for( var j = 0 ; j < songs.length ; j< ){
                    var songname = songs[j].getAttribute("name");
                    var songid = songs[j].getAttribute("id");
                    data.push( { title: songname.concat(' - ',artistname)  , description: songid } )
                }
            }
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
