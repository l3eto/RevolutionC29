//get search
  function getSearchURL(){
    var result = /^[?](song)[=](.*)$/gmi.exec( window.location.search );
    if(result){
      result.shift();
      if( result[0] == 'song'){
        return result[1];
      }
    }else{
      return null;
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
    $('.ui.search').search({
      source: xmldata ,
      onSelect: function(result, response) {
        window.location.search = "?song=".concat(result.description);
      }
    });
    });
  }

$( document ).ready(function(){
  //set songs on search
  setContent();
  //read if some song is on search
  var searchingsong = getSearchURL();
  if( searchingsong ){
    //search especific song
    readXML("../uploads/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    //get song
    var song = $( xmlDoc ).find('song[id="'+searchingsong+'"]').get(0);
    //get values
    var artistName = song.parentNode.parentNode.getAttribute("name");
    var songName = song.getAttribute("name");
    var title = artistName+' - '+songName;
    setTitle( title );
    setAudio( title );
    
    });
    
    
    
  }else{
    $('#search-result').remove();
  }
});

//set tittle
function setTitle( title ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui fluid one item tabs menu");
  var div2 = document.createElement('SPAN');
  div2.setAttribute("class","item");
  div2.innerHTML = title;
  div.appendChild( div2 );
  document.getElementById('search-result').appendChild( div );
}

//set audio
function setAudio( title ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui fluid four item menu effect-revolution");
  //pause
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("click","console.log('pause');");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon pause");
  item.appendChild(icon);
  div.appendChild(item);
  //play
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("click","console.log('play');");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon play");
  item.appendChild(icon);
  div.appendChild(item);
  //stop
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("click","console.log('stop');");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon stop");
  item.appendChild(icon);
  div.appendChild(item);
  //repeat
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("click","console.log('repeat');");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon repeat");
  item.appendChild(icon);
  div.appendChild(item);
  document.getElementById('search-result').appendChild( div );
}
