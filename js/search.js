//get search
  function getSearchURL(){
    var result = /^[?](song)=(.*)$/gmi.exec( window.location.search );
    if(result){
      result.shift();
      if( result[0] == 'song'){
        return result[1];
      }
    }
  }

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
  function setContent(){
    readXML("../uploads/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    var xmldata = [];
    var artist = xmlDoc.getElementsByTagName("artist");
    if( artist.length > 0 ){
        for( var i = 0 ; i < artist.length ; i++){
            var artistname = artist[i].getAttribute("name");
            var songs = artist[i].getElementsByTagName("song");
            if( songs.length > 0 ){
                for( var j = 0 ; j < songs.length ; j++ ){
                    var songname = songs[j].getAttribute("name");
                    var songid = songs[j].getAttribute("id");
                    var title = songname.concat(' - ',artistname);
                    xmldata.push( { title: title  , description: songid } );
                }
            }
        }
    }
    console.log(xmldata);
    $('.ui.search').search({source: xmldata });
    });
  }
var content = [];
$( document ).ready(function() {
  setContent();
});
