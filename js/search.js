//global var
var audio;
var loop = false;

//customlabels
var customLabels = {
  'intro':'Intro',
  'prechorus':'Pre Coro',
  'postchorus':'Coro',
  'verse':'Verso',
  'verse1':'Verso 1',
  'verse2':'Verso 2',
  'verse3':'Verso 3',
  'verse4':'Verso 4',
  'chorus':'Coro',
  'chorus1':'Coro 1',
  'chorus2':'Coro 2',
  'bridge':'Puente',
  '2':'two',
  '4':'four',
  '6':'six',
  '8':'eight',
  '10':'ten',
  '16':'sixteen'
  
}

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
  readXML("../uploads/xml/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    var xmldata = [];
    var song = xmlDoc.getElementsByTagName("song");
    var error = xmlDoc.getElementsByTagName("parsererror");
    if( error.length == 0 ){
      if( song.length > 0 ){
        for( var i = 0 ; i < song.length ; i++ ){
          var songname = song[i].getAttribute("name");
          var songid = song[i].getAttribute("id");
          var artists = song[i].getElementsByTagName("artist");
          var artist = [];
          for( var j = 0 ; j < artists.length ; j++ ){
            artist.push( artists[j].getAttribute("name") );
          }
          var artistname = artist.join(" & ");
          var title = artistname.concat(" - ",songname);
          xmldata.push( { title: title  , description: songid } );
        }
      }
      $('.ui.search').search({
        source: xmldata ,
        onSelect: function(result, response) {
          window.location.search = "?song=".concat(result.description);
        }
      });
    }else{
      console.log(error[0].innerText);
    }
  });
}

$( document ).ready(function(){
  //set songs on search
  setContent();
  //read if some song is on search
  var searchingsong = getSearchURL();
  if( searchingsong ){
    //search especific song
    readXML("../uploads/xml/songs.xml", function(data){
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
      var artists = song.getElementsByTagName("artist");
      var artist = [];
      for( var j = 0 ; j < artists.length ; j++ ){
        artist.push( artists[j].getAttribute("name") );
      }
      var artistName = artist.join(" & ");
      var songName = song.getAttribute("name");
      var title = artistName+' - '+songName;
      var imgsrc = "../uploads/img/unknow.jpg";
      console.log(artists);
      if( artists[0].getAttribute("id") ) var imgsrc = "../uploads/img/".concat(artists[0].getAttribute("id"),".jpg");
      var orden = song.getAttribute("order").split("-");
      document.title = songName+' | Revolution C29';
      audio = new Audio( '../audio/'+encodeURI(title)+'.mp3');
      audio.addEventListener('ended', function() {
        if( loop == true){this.currentTime = 0;this.play();}else{this.currentTime = 0;this.pause();}
      }, false);
      setTitle( title,imgsrc );
      setMenu();
      setAudio( title );
      setLetras(song,orden);
      setAcordes(song,orden);
      $('.menu .item').tab();
    });
  }else{
    $('#search-result').remove();
  }
});

//set tittle
function setTitle( title , imgsrc ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui clearing segment");
  var h2 = document.createElement("H2");
  h2.setAttribute("class","ui left floated header beru-title");
  var img = document.createElement('IMG');
  img.setAttribute("class","ui circular image");
  img.setAttribute("src",imgsrc);
  h2.appendChild(img);
  var span = document.createElement('SPAN');
  span.setAttribute("class","item");
  span.setAttribute("style","margin-left: 18px;")
  span.innerHTML = title;
  h2.appendChild(span);
  div.appendChild(h2);
  var h2 = document.createElement("H2");
  h2.setAttribute("class","ui right floated header beru-title");
  var icon = document.createElement('I');
  icon.setAttribute("class","setting icon");
  icon.setAttribute("style","padding-top: 13px;");
  h2.appendChild(icon);
  div.appendChild(h2);
  document.getElementById('search-result').appendChild( div );
}

//set audio
function setAudio( title ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui fluid four item menu effect-revolution");
  //pause
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("onclick","audio.pause();");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon pause");
  item.appendChild(icon);
  div.appendChild(item);
  //play
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("onclick","audio.play();");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon play");
  item.appendChild(icon);
  div.appendChild(item);
  //stop
  var item = document.createElement('DIV');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("onclick","audio.pause();audio.currentTime = 0;;");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon stop");
  item.appendChild(icon);
  div.appendChild(item);
  //repeat
  var item = document.createElement('A');
  item.setAttribute("class","item effect-revolution");
  item.setAttribute("onclick","loop=!loop;$(this).find('i').toggleClass('repeat');$(this).find('i').toggleClass('refresh');");
  var icon = document.createElement('I');
  icon.setAttribute("class","icon repeat");
  item.appendChild(icon);
  div.appendChild(item);
  document.getElementById('search-result').appendChild( div );
}

//set menu
function setMenu(){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui fluid two item tabs menu");
  var item = document.createElement('A');
  item.setAttribute("class","item active");
  item.setAttribute("data-tab","Letra");
  item.innerHTML="Letra";
  div.appendChild(item);
  var item = document.createElement('A');
  item.setAttribute("class","item");
  item.setAttribute("data-tab","Acordes");
  item.innerHTML="Acordes";
  div.appendChild(item);
  document.getElementById('search-result').appendChild( div );
}

//set letras
function setLetras( song , orden ){
  var div = document.createElement('DIV')  ;
  div.setAttribute("class","ui active tab");
  div.setAttribute("data-tab","Letra");
  var container = document.createElement('DIV');
  container.setAttribute("class","ui center aligned segment");
  var songcontainer = document.createElement('DIV');
  songcontainer.setAttribute("class","ui song-container beru-container");
  for( var i = 0 ; i < orden.length ; i++ ){
    var lyric = $( song ).find('lyric[name="'+orden[i]+'"]').get(0).getElementsByTagName("p");
    if( lyric.length > 0 ){
      for( var j = 0 ; j < lyric.length ; j++ ){
        var SPAN = document.createElement('SPAN');
        SPAN.innerHTML = lyric[j].getAttribute("text");
        songcontainer.appendChild(SPAN);
        songcontainer.appendChild(document.createElement('BR'));
      }
      songcontainer.appendChild(document.createElement('BR'));
    }
  }
  container.appendChild(songcontainer);
  div.appendChild(container);
  document.getElementById('search-result').appendChild( div );
}

//set acordes
function setAcordes( song , orden ){
  var div = document.createElement('DIV')  ;
  div.setAttribute("class","ui tab");
  div.setAttribute("data-tab","Acordes");
  var container = document.createElement('DIV');
  container.setAttribute("class","ui center aligned segment");
  var songcontainer = document.createElement('DIV');
  songcontainer.setAttribute("class","ui song-container");
  songcontainer.setAttribute("class","ui song-container beru-container");
  var grid = document.createElement('DIV');
  grid.setAttribute("class","ui grid");
  for( var i = 0 ; i < orden.length ; i++ ){
    //set tittle
    var divGrid = document.createElement('DIV');
    divGrid.setAttribute("class","left aligned sixteen wide column");
    divGrid.setAttribute("style","padding: 1em 1em 0.25em 1em;;margin-left:2em;");
    var musicon = document.createElement('I');
    musicon.setAttribute("class","music icon");
    musicon.setAttribute("style","font-size:1.5em;");
    divGrid.appendChild(musicon);
    var divTitle = document.createElement('DIV');
    divTitle.setAttribute("class","ui left pointing black ignored label");
    divTitle.setAttribute("style","font-size:1em;");
    divTitle.innerHTML = customLabels[ orden[i] ];
    divGrid.appendChild(divTitle);
    grid.appendChild(divGrid);
    //add divider
    var divGrid = document.createElement('DIV');
    divGrid.setAttribute("class","sixteen wide column");
    divGrid.setAttribute("style","padding-bottom: 0.5em;");
    var divider = document.createElement('DIV');
    divider.setAttribute("class","ui divider");
    divGrid.appendChild(divider);
    grid.appendChild(divGrid);
    //set notes and chords
    var lyric = $( song ).find('lyric[name="'+orden[i]+'"]').get(0); //load lyric by orden
    var chord = $( song ).find('chord[name="'+lyric.getAttribute("chord")+'"]').get(0); //load chord from lyric
    if( chord ){
      for( var j = 0 ; j < chord.getElementsByTagName("p").length ; j ++ ){
        //add notes if exists
        var notes = chord.getElementsByTagName("p")[j].getElementsByTagName("a");
        if( notes.length > 0 ){
          for( var k = 0 ; k < notes.length ; k ++ ){
            if( notes[k].getAttribute("note") == "null" ){
              var divGrid = document.createElement('DIV');
              divGrid.setAttribute("class",customLabels[notes[k].getAttribute("temp")]+" wide column");
              grid.appendChild(divGrid);
            }else{
              var divGrid = document.createElement('DIV');
              divGrid.setAttribute("class",customLabels[notes[k].getAttribute("temp")]+" wide column");
              var divNote = document.createElement('A');
              divNote.setAttribute("class","ui red basic label");
              divNote.setAttribute("style","font-size:0.8em");
              divNote.innerHTML = notes[k].getAttribute("note");
              divGrid.appendChild(divNote);
              grid.appendChild(divGrid);
            }
          }
        }
        //add lyrics if exists
        if( lyric.getElementsByTagName("p").length > 0 ){
          var divGrid = document.createElement('DIV');
          divGrid.setAttribute("class","sixteen wide column");
          divGrid.innerHTML = lyric.getElementsByTagName("p")[j].getAttribute("text");
          grid.appendChild(divGrid);
        }
      }
    }
  }
  songcontainer.appendChild(grid);
  container.appendChild(songcontainer);
  div.appendChild(container);
  document.getElementById('search-result').appendChild( div );
}
