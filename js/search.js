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
  function getSearchURL( type ){
    var result = /^[?](.*)[=](.*)$/gmi.exec( window.location.search );
    if(result){
      result.shift();
      if( result[0] == type){
        return result[1];
      }else{
        return null;
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
  //read if some song is on search url
  var searchingsong = getSearchURL('song');
  //read if some artist is on search url
  var searchingartist = getSearchURL('artist');
  //conditionals
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
      var artistId = null;
      if( artists[0].getAttribute("id") ){var imgsrc = "../uploads/img/".concat(artists[0].getAttribute("id"),".jpg");artistId=artists[0].getAttribute("id");}
      var orden = song.getAttribute("order").split("-");
      document.title = songName+' | Revolution C29';
      audio = new Audio( '../audio/'+encodeURI(title)+'.mp3');
      audio.addEventListener('ended', function() {
        if( loop == true){this.currentTime = 0;this.play();}else{this.currentTime = 0;this.pause();}
      }, false);
      setTitle(artistName,songName,imgsrc,artistId);
      setMenu();
      setAudio( title );
      setLetras(song,orden);
      setAcordes(song,orden);
      $('.menu .item').tab();
      $('.beru-note').click(function(){ shownote( this ); });
    });
  }else if( searchingartist ){
    //search especific artist
    readXML("../uploads/xml/songs.xml", function(data){
      if (window.DOMParser){
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, "text/xml");
      }else{
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(data);
      }
      //get artist
      var artist = $( xmlDoc ).find('artist[id="'+searchingartist+'"]');
      var artistName = artist.get(0).getAttribute("name");
      //set title
      setArtistTitle(artistName,searchingartist);
      setDivition();
      setSongs(artist);
    });
  }else{
    $('#search-result').remove();
  }
});

//set artitsTitle
function setArtistTitle( name , id ){
  var h1 = document.createElement('H1');
  h1.setAttribute("class","ui header");
  var img = document.createElement("IMG");
  img.setAttribute("class","ui circular image");
  img.setAttribute("src","../uploads/img/".concat(id,".jpg"));
  var span = document.createElement("SPAN");
  span.setAttribute("style","margin-left: 18px;");
  span.innerHTML = name;
  h1.appendChild(img);
  h1.appendChild(span);
  document.getElementById('search-result').appendChild( h1 );
}

//set divition
function setDivition(){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui divider");
  document.getElementById('search-result').appendChild( div );
}

//set Songs
function setSongs( artist ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui middle aligned selection list");
  $( artist ).each(function(){
    var song = this.parentNode.parentNode;
    var songName = song.getAttribute("name");
    var item = document.createElement('DIV');
    item.setAttribute("class","item");
    var icon = document.createElement('I');
    icon.setAttribute("class","play icon");
    item.appendChild(icon);
    var content = document.createElement('DIV');
    content.setAttribute("class","content");
    var header = document.createElement('DIV');
    header.setAttribute("class","header");
    header.innerHTML = songName;
    content.appendChild(header);
    item.appendChild(content);
    div.appendChild(item);
  });
  document.getElementById('search-result').appendChild( div );
}

//set tittle
function setTitle( artist , song , imgsrc , artistid ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui clearing segment");
  //title container
  var h2 = document.createElement("H2");
  h2.setAttribute("class","ui left floated header beru-title");
  //image artist
  var img = document.createElement('IMG');
  img.setAttribute("class","ui circular image beru-image");
  img.setAttribute("src",imgsrc);
  h2.appendChild(img);
  //title
  var titlespancontainer = document.createElement('DIV');
  titlespancontainer.setAttribute("class","item");
  titlespancontainer.setAttribute("style","display:inline-block;")
  var span = document.createElement('A');
  span.setAttribute("class","beru-artist");
  span.setAttribute("style","margin-left: 16px!important;");
  if( artistid == null ){span.setAttribute("href","#");}
  else{ span.setAttribute("href","?artist="+artistid);}
  span.innerHTML = artist;
  titlespancontainer.appendChild(span);
  var br = document.createElement('BR');
  titlespancontainer.appendChild(br);
  var span = document.createElement('SPAN');
  span.setAttribute("class","beru-song");
  span.setAttribute("style","margin-left: 16px!important;")
  span.innerHTML = song;
  titlespancontainer.appendChild(span);
  h2.appendChild(titlespancontainer);
  div.appendChild(h2);
  //icon settings
  var setting = document.createElement("A");
  setting.setAttribute("class","ui right floated header beru-title");
  setting.setAttribute("style","padding-top: 13px;");
  setting.setAttribute("onclick","$('.ui.setting-container').transition('drop', '500ms');")
  var icon = document.createElement('I');
  icon.setAttribute("class","setting icon");
  setting.appendChild(icon);
  div.appendChild(setting);
  //settings hidde div
  var hiddendiv = document.createElement("DIV");
  hiddendiv.setAttribute("class","ui setting-container transition hidden");
  //settings container
  var div2 = document.createElement("DIV");
  div2.setAttribute("class","ui left floated header beru-title inverted segment");
  div2.setAttribute("style","width:100%;margin-top:16px!important;");
  //title for buttons
  var span = document.createElement("SPAN");
  span.innerHTML="Cambiar Tono";
  div2.appendChild(span);
  //add buttons
  var buttons = document.createElement("DIV");
  buttons.setAttribute("class","ui grid");
  buttons.setAttribute("style","padding:10px;");
  //button
  var column = document.createElement("DIV");
  column.setAttribute("class","ui four wide column");
  var button = document.createElement("BUTTON");
  button.setAttribute("class","ui labeled icon beru-icon black button beru-button");
  button.setAttribute("style","width: 100%;height: 100%;");
  button.setAttribute("onclick","modifynote(-2);");
  var icon = document.createElement("I");
  icon.setAttribute("class","left minus icon beru-icon");
  button.appendChild(icon);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-mobile-desktop");
  span.innerHTML = "1";
  button.appendChild(span);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-desktop");
  span.innerHTML = " Tono";
  button.appendChild(span);
  column.appendChild(button);
  buttons.appendChild(column);
  //button
  var column = document.createElement("DIV");
  column.setAttribute("class","ui four wide column");
  var button = document.createElement("BUTTON");
  button.setAttribute("class","ui labeled icon beru-icon black button beru-button");
  button.setAttribute("style","width: 100%;height: 100%;");
  button.setAttribute("onclick","modifynote(-1);");
  var icon = document.createElement("I");
  icon.setAttribute("class","left minus icon beru-icon");
  button.appendChild(icon);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-mobile-desktop");
  span.innerHTML = "1/2";
  button.appendChild(span);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-desktop");
  span.innerHTML = " Tono";
  button.appendChild(span);
  column.appendChild(button);
  buttons.appendChild(column);
  //button
  var column = document.createElement("DIV");
  column.setAttribute("class","ui four wide column");
  var button = document.createElement("BUTTON");
  button.setAttribute("class","ui labeled icon beru-icon black button beru-button");
  button.setAttribute("style","width: 100%;height: 100%;");
  button.setAttribute("onclick","modifynote(+1);");
  var icon = document.createElement("I");
  icon.setAttribute("class","right plus icon beru-icon");
  button.appendChild(icon);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-mobile-desktop");
  span.innerHTML = "1/2";
  button.appendChild(span);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-desktop");
  span.innerHTML = " Tono";
  button.appendChild(span);
  column.appendChild(button);
  buttons.appendChild(column);
  //button
  var column = document.createElement("DIV");
  column.setAttribute("class","ui four wide column");
  var button = document.createElement("BUTTON");
  button.setAttribute("class","ui labeled icon beru-icon black button beru-button");
  button.setAttribute("style","width: 100%;height: 100%;");
  button.setAttribute("onclick","modifynote(+2);");
  var icon = document.createElement("I");
  icon.setAttribute("class","right plus icon beru-icon");
  button.appendChild(icon);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-mobile-desktop");
  span.innerHTML = "1";
  button.appendChild(span);
  var span = document.createElement("SPAN");
  span.setAttribute("class","beru-only-desktop");
  span.innerHTML = " Tono";
  button.appendChild(span);
  column.appendChild(button);
  buttons.appendChild(column);
  div2.appendChild(buttons);
  hiddendiv.appendChild(div2);
  div.appendChild(hiddendiv);
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
              divNote.setAttribute("class","ui red basic label beru-note");
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
