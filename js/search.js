//global var
var audio;
var loop = false;

//customlabels
var customLabels = {
  'intro':'Intro',
  'verse':'Verso',
  'verse1':'Verso 1',
  'verse2':'Verso 2',
  'chorus':'Coro',
  'chorus1':'Coro 1',
  'chorus2':'Coro 2',
  'bridge':'Puente',
  '4':'four',
  '8':'eight',
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
      var orden = song.getAttribute("order").split("-");
      document.title = songName+' | Revolution C29';
      audio = new Audio( '../audio/'+encodeURI(title)+'.mp3');
      audio.addEventListener('ended', function() {
        if( loop == true){this.currentTime = 0;this.play();}else{this.currentTime = 0;this.pause();}
      }, false);
      setTitle( title );
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
function setTitle( title ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui fluid one item tabs menu");
  var div2 = document.createElement('SPAN');
  div2.setAttribute("class","item");
  div2.setAttribute("style","font-size:1.5em;");
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
  songcontainer.setAttribute("class","ui song-container");
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
  var grid = document.createElement('DIV');
  grid.setAttribute("class","ui grid");
  for( var i = 0 ; i < orden.length ; i++ ){
    //set tittle
    var divGrid = document.createElement('DIV');
    divGrid.setAttribute("class","sixteen wide column");
    divGrid.setAttribute("style","padding-top: 1em;padding-bottom: 1em;margin-left:3em;");
    var musicon = document.createElement('I');
    musicon.setAttribute("class","music icon");
    divGrid.appendChild(musicon);
    var divTitle = document.createElement('DIV');
    divTitle.setAttribute("class","ui left pointing black ignored label");
    divTitle.innerHTML = customLabels[ orden[i] ];
    divGrid.appendChild(divTitle);
    grid.appendChild(divGrid);
    //set notes and chords
    var lyric = $( song ).find('lyric[name="'+orden[i]+'"]').get(0); //load lyric by orden
    var chord = $( song ).find('chord[name="'+lyric.getAttribute("chord")+'"]').get(0); //load chord from lyric
    if( lyric.getElementsByTagName("p").length > 0 ){
      //if have lyric and chord
      for( var j = 0 ; j < chord.getElementsByTagName("p").length ; j ++ ){
        var notes = chord.getElementsByTagName("p")[j].getElementsByTagName("a");
        for( var k = 0 ; k < notes.length ; k ++ ){
          var divGrid = document.createElement('DIV');
          divGrid.setAttribute("class",customLabels[notes[k].getAttribute("temp")]+" wide column");
          divGrid.innerHTML = notes[k].getAttribute("note");
          grid.appendChild(divGrid);
        }
        var divGrid = document.createElement('DIV');
        divGrid.setAttribute("class","sixteen wide column");
        divGrid.innerHTML = lyric.getElementsByTagName("p")[j].getAttribute("text");
        grid.appendChild(divGrid);
      }
    }else{
      //if have not lyric only chord
      for( var j = 0 ; j < chord.getElementsByTagName("p").length ; j ++ ){
        var notes = chord.getElementsByTagName("p")[j].getElementsByTagName("a");
        for( var k = 0 ; k < notes.length ; k ++ ){
          var divGrid = document.createElement('DIV');
          divGrid.setAttribute("class",customLabels[notes[k].getAttribute("temp")]+" wide column");
          divGrid.innerHTML = notes[k].getAttribute("note");
          grid.appendChild(divGrid);
        }
      }
    }
    
    
    
    
    
    //setnotes
    //var chordname = $( song ).find('lyric[name="'+orden[i]+'"]').get(0).getAttribute("chord");
    //var chords = $( song ).find('chord[name="'+chordname+'"]').get(0).getElementsByTagName("a");
   /* if( chordname ){
      var lyric = $( song ).find('lyric[name="'+orden[i]+'"]').get(0).getElementsByTagName("p");
      if( lyric.length > 0 & chords.length > 0 ){
        //set lyrics&notes
        for( var j = 0 ; j < lyric.length ; j++ ){
          //set notes first
          for( var k = 0 ; k < chords.length ; k ++ ){
            var divGrid = document.createElement('DIV');
            divGrid.setAttribute("class",customLabels[chords[k].getAttribute("temp")]+" wide column");
            divGrid.innerHTML = chords[k].getAttribute("note");
            grid.appendChild(divGrid);  
          }
          //set lyrcis
          var divGrid = document.createElement('DIV');
          divGrid.setAttribute("class","sixteen wide column");
          divGrid.innerHTML = lyric[j].getAttribute("text");
          grid.appendChild(divGrid);
        }
      }else{
        //only set notes
        if( chords.length > 0 ){
          for( var k = 0 ; k < chords.length ; k ++ ){
            var divGrid = document.createElement('DIV');
            divGrid.setAttribute("class",customLabels[chords[k].getAttribute("temp")]+" wide column");
            divGrid.innerHTML = chords[k].getAttribute("note");
            grid.appendChild(divGrid);  
          }
        }
      }
    }*/
  }
  songcontainer.appendChild(grid);
  container.appendChild(songcontainer);
  div.appendChild(container);
  document.getElementById('search-result').appendChild( div );
}
