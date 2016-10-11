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
  'chorus3':'Coro 3',
  'bridge':'Puente',
  'bridge1':'Puente 1',
  'bridge2':'Puente 2',
  'ending':'Final',
  '1':'one',
  '2':'two',
  '3':'three',
  '4':'four',
  '6':'six',
  '8':'eight',
  '10':'ten',
  '12':'twelve',
  '14':'fourteen',
  '16':'sixteen'

}


var modifynote = function( tone ){
  var notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  $('.beru-note').each(function(){
    var n = $(this).html();
    var r = '';
    for( var i = 0 ; i < n.length ; i ++ ){
      for( var j = 0 ; j < notes.length ; j ++ ){
        var add = true;
        var index = notes.indexOf( n[i] );
        if( index > -1 ){
          if( n[i+1] ){
            var n2 = n[i]+n[i+1];
            var index2 = notes.indexOf( n2 );
            if( index2 > -1 ){
              index = index2;
              i ++;
            }
          }
          var index3 = index + tone;
          if( index3 >= notes.length  ) index3 -= notes.length;
          if( index3 < 0  ) index3 += notes.length;
          r += notes[ index3 ];
          add = false;
          break;
        }
      }
      if( add == true ){r += n[i];}
    }
    $( this ).html( r );
  });
}

var shownote = function( element ){
  $('.ui.modal.note').find('.ui.center.aligned.header').html( $(element).html() );
  $('.ui.modal.note').modal({blurring: true}).modal('show').modal('setting', 'transition', 'scale');
}

var Playlist = function( artist ){
//  this._song = null;
  this._randomMode = false;
  this._songs = [];
  this._index = null;
  this.setSongs(artist);
}

Playlist.prototype.setSongs = function( artist ){
  var songs = [];
  var that = this;
  $( artist ).each(function(){
    var artists = this.parentNode.getElementsByTagName("artist");
    var r = [];
    for( var j = 0 ; j < artists.length ; j++ ){
      r.push( artists[j].getAttribute("name") );
    }
    var artistName = r.join(" & ");
    var src = artistName+" - "+this.parentNode.parentNode.getAttribute("name");
    var audio = new Audio( "../audio/"+encodeURI(src)+".mp3");
    audio.song = this.parentNode.parentNode.getAttribute("name");
    audio.artist = this.getAttribute("name");
    audio.addEventListener('ended', that.songEnded.bind(that) , false);
    songs.push( audio );
  });
  this._songs = songs;
}

Playlist.prototype.songEnded = function(){
  this.stopSong();
  if( this._randomSong == true ) this.randomIndex();
  if( this._randomSong == false ) this.increaseIndex();
  this.playSong();
}

Playlist.prototype.setIndex = function( index ){
  this._index = index;
}

Playlist.prototype.setTitleSong = function(){
  window.document.title = this._songs[this._index].song + " | Revolution C29";
}

Playlist.prototype.restoreTitle = function(){
  window.document.title = "Buscar | Revolution C29";
}

Playlist.prototype.playSong = function(){
  if( this._index == null ){ this.setIndex(0);}
  this.setTitleSong();
  if( this._songs[this._index].paused ){
    this._songs[this._index].play();
    this.setPlayColor();
  }else{
    this.pauseSong();
  }
}

Playlist.prototype.pauseSong = function(){
  if( this._index == null ){ this.setIndex(0);}
  this._songs[this._index].pause();
  this.restoreColor();
}

Playlist.prototype.stopSong = function(){
  if( this._index == null ){ this.setIndex(0);}
  this.restoreTitle();
  this.pauseSong();
  this._songs[this._index].currentTime = 0
  this.restoreColor();
}

Playlist.prototype.restoreColor = function(){
  //change color icon menu
  if( $('.ui.compact.menu').find('i.pause.icon').hasClass("beru-text-color") ){ $('.ui.compact.menu').find('i.pause.icon').removeClass( "beru-text-color" );}
  $('.ui.compact.menu').find('i.pause.icon').removeClass("pause icon").addClass("play icon");
  //change color icon list
  var element = $( '.ui.selection.list .item.beru-item' ).get( this._index );
  if( $( element ).find('i.pause.icon').hasClass("beru-text-color") ){ $( element ).find('i.pause.icon').removeClass( "beru-text-color" );}
  $( element ).find('i.pause.icon').removeClass("pause icon").addClass("play icon");
  if( $( element ).find('.content .header').hasClass("beru-text-color") ){ $( element ).find('.content .header').removeClass( "beru-text-color" );}
}

Playlist.prototype.setPlayColor = function(){
  $('.ui.compact.menu').find('i.play.icon').addClass("beru-text-color");
  $('.ui.compact.menu').find('i.play.icon').removeClass("play icon").addClass("pause icon");
  var element = $( '.ui.selection.list .item.beru-item' ).get( this._index );
  $( element ).find('i.play.icon').addClass("beru-text-color");
  $( element ).find('i.play.icon').removeClass("play icon").addClass("pause icon");
  $( element ).find('.content .header').addClass("beru-text-color");
}

Playlist.prototype.clickOnItem = function( item ){
  var newindex = $( '.ui.selection.list .item.beru-item' ).index( item );
  if( this._index == newindex ){
    this.playSong();
  }else{
    this.stopSong();
    this.setIndex( newindex );
    this.playSong();
  }
}

Playlist.prototype.decreaseIndex = function(){
  if( this._index - 1 < 0  ){this._index = this._songs.length - 1;}
  else{ this._index -= 1;}
}

Playlist.prototype.increaseIndex = function(){
  if( this._index + 1 >= this._songs.length  ){this._index = 0;}
  else{ this._index += 1;}
}

Playlist.prototype.randomIndex = function(){
  var rnd = Math.floor( Math.random()*this._songs.length );
  if( this._index == rnd ){
    var rnd2 = Math.floor( Math.random()*2 );
    if( rnd2 == 0) this.increaseIndex();
    if( rnd2 == 1) this.decreaseIndex();
  }else{
    this._index = rnd;
  }
}

Playlist.prototype.backwardSong = function(){
  this.stopSong();
  this.decreaseIndex();
  this.playSong();
}

Playlist.prototype.forwardSong = function(){
  this.stopSong();
  this.increaseIndex();
  this.playSong();
}

Playlist.prototype.randomMode = function(){
  $('.ui.compact.menu').find('i.random.icon').toggleClass("beru-text-color");
  this._randomMode =! this._randomMode;
}


/*
*
*
*
*
*/


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

//get all id of
function getAllIds(tag){
  var t = [];
  $( tag , xmlDoc).each(function() {
    var id = this.getAttribute("id");
    if($.inArray(id, t)===-1){
      t.push(id);
    }
  });
  return t;
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

//serach inputs
var getAllSongs = function(){
  var xmlData = [];
  readXML("../uploads/xml/songs.xml", function(data){
    if(window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    if( xmlDoc.getElementsByTagName("parsererror").length > 0 ){
      return xmlDoc.getElementsByTagName("parsererror")[0].innerText;
    }else{
      var song = xmlDoc.getElementsByTagName("song");
      if( song.length > 0 ){
        for( var i = 0 ; i < song.length ; i++ ){
          var a = [];
          var artists = song[i].getElementsByTagName("artist");
          for( var j = 0 ; j < artists.length ; j++ ){
            a.push( artists[j].getAttribute("name") );
          }
          xmlData.push( { title: a.join( " & " ).concat( " - ", song[i].getAttribute("name") , description: song[i].getAttribute("id") } );
        }
      }
      return xmlData;
    }
  });
}

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
    var xmlDataSong = [];
    var xmlDataArtist = [];
    var song = xmlDoc.getElementsByTagName("song");
    var artist = xmlDoc.getElementsByTagName("artist");
    var error = xmlDoc.getElementsByTagName("parsererror");
    if( error.length == 0 ){
      if( song.length > 0 ){
        for( var i = 0 ; i < song.length ; i++ ){
          var songname = song[i].getAttribute("name");
          var artists = song[i].getElementsByTagName("artist");
          var artistV = [];
          for( var j = 0 ; j < artists.length ; j++ ){
            artistV.push( artists[j].getAttribute("name") );
          }
          var artistname = artistV.join(" & ");
          var title = artistname.concat(" - ",songname);
          xmlDataSong.push( { title: title  , description: song[i].getAttribute("id") } );
        }
        //add data songs to search
        $('.ui.search.bysong').search({
          source: xmlDataSong ,
          onSelect: function(result, response) {
            window.location.search = "?song=".concat(result.description);
          }
        });
      }
      if( artist.length > 0 ){
        var temp=[];
        $('artist', xmlDoc).each(function() {
            var id= this.getAttribute("id");
            var name= this.getAttribute("name");
            if($.inArray(id, temp)===-1){
              temp.push(id);
              xmlDataArtist.push({ title:name,description:id });
            }
        });
        //add data songs to search
        $('.ui.search.byartist').search({
          source: xmlDataArtist ,
          onSelect: function(result, response) {
            window.location.search = "?artist=".concat(result.description);
          }
        });
      }

    }else{
      console.log(error[0].innerText);
    }
  });
}


var setLastSongs = function( songs , numSongs ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui selection list");
  for( var i = 0 ; i < numSongs ; i++ ){
    var song = songs.get(i);
    var songName = song.getAttribute("name");
    var songId = song.getAttribute("id");
    var item = document.createElement('DIV');
    item.setAttribute("class","item beru-item");
    var watchsong = document.createElement('A');
    watchsong.setAttribute("class","right floated tiny beru-bg-color ui button");
    watchsong.setAttribute("href","?song="+songId);
    watchsong.innerHTML="Ver";
    item.appendChild(watchsong);
    var icon = document.createElement('I');
    icon.setAttribute("class","music icon");
    item.appendChild(icon);
    var content = document.createElement('DIV');
    content.setAttribute("class","content");
    var header = document.createElement('DIV');
    header.setAttribute("class","header");
    var span = document.createElement('SPAN');
    span.innerHTML = songName;
    header.appendChild(span);
    var artists = song.getElementsByTagName("artist");
    var artist = [];
    for( var j = 0 ; j < artists.length ; j++ ){
      artist.push( artists[j].getAttribute("name") );
    }
    var artistName = artist.join(" & ");
    var span = document.createElement('SPAN');
    span.setAttribute("class","beru-only-desktop low-weight");
    span.innerHTML = " - "+artistName;
    header.appendChild(span);
    content.appendChild(header);
    item.appendChild(content);
    div.appendChild(item);
  }
  document.getElementById('search-result').appendChild( div );
}

//set title for no searchingartist
var setTitleNoSearching = function(iconname,title){
  var h1 = document.createElement('H1');
  h1.setAttribute("class","ui header");
  //author img
  var icon = document.createElement("I");
  icon.setAttribute("class",iconname+" icon");
  icon.setAttribute("style","position:absolute;margin-left: 15px;padding:0px;");
  h1.appendChild(icon);
  //author name
  var span = document.createElement("SPAN");
  span.setAttribute("style","margin-left: 75px;");
  span.innerHTML = title;
  h1.appendChild(span);
  document.getElementById('search-result').appendChild( h1 );
}

//set artitsTitle
function setArtistTitle( name , id ){
  var h1 = document.createElement('H1');
  h1.setAttribute("class","ui header");
  //author img
  var img = document.createElement("IMG");
  img.setAttribute("class","ui circular image");
  img.setAttribute("src","../uploads/img/".concat(id,".jpg"));
  h1.appendChild(img);
  //author name
  var span = document.createElement("SPAN");
  span.setAttribute("style","margin-left: 18px;");
  span.innerHTML = name;
  h1.appendChild(span);
  //add space
  var br = document.createElement("BR");
  h1.appendChild(br);
  //media player
  var segment = document.createElement("DIV");
  segment.setAttribute("class","ui center aligned segment beru-false-segment");
  segment.setAttribute("style","margin-top: 16px!important;");
  var music = document.createElement("DIV");
  music.setAttribute("class","ui compact menu");
  var item = document.createElement("A");
  item.setAttribute("class","item");
  item.setAttribute("onclick","playlist.backwardSong();");
  var icon = document.createElement("I");
  icon.setAttribute("class","step backward icon");
  item.appendChild(icon);
  music.appendChild(item);
  var item = document.createElement("A");
  item.setAttribute("class","item");
  item.setAttribute("onclick","playlist.stopSong();");
  var icon = document.createElement("I");
  icon.setAttribute("class","stop icon");
  item.appendChild(icon);
  music.appendChild(item);
  var item = document.createElement("A");
  item.setAttribute("class","item");
  var icon = document.createElement("I");
  icon.setAttribute("class","play icon");
  item.setAttribute("onclick","playlist.playSong();");
  item.appendChild(icon);
  music.appendChild(item);
  var item = document.createElement("A");
  item.setAttribute("class","item");
  item.setAttribute("onclick","playlist.randomMode();");
  var icon = document.createElement("I");
  icon.setAttribute("class","random icon");
  item.appendChild(icon);
  music.appendChild(item);
  var item = document.createElement("A");
  item.setAttribute("class","item");
  item.setAttribute("onclick","playlist.forwardSong();");
  var icon = document.createElement("I");
  icon.setAttribute("class","step forward icon");
  item.appendChild(icon);
  music.appendChild(item);
  segment.appendChild(music);
  h1.appendChild(segment);
  document.getElementById('search-result').appendChild( h1 );
}

//set divition
function setDivition(){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui divider");
  div.setAttribute("style","padding-bottom:14px;");
  document.getElementById('search-result').appendChild( div );
}

//set Songs
function setSongs( artist ){
  var div = document.createElement('DIV');
  div.setAttribute("class","ui selection list");
  $( artist ).each(function(){
    var song = this.parentNode.parentNode;
    var songName = song.getAttribute("name");
    var songId = song.getAttribute("id");
    var item = document.createElement('DIV');
    item.setAttribute("class","item beru-item");
    item.setAttribute("onclick","playlist.clickOnItem( this );");
    var watchsong = document.createElement('A');
    watchsong.setAttribute("class","right floated tiny beru-bg-color ui button");
    watchsong.setAttribute("href","?song="+songId);
    watchsong.innerHTML="Ver";
    item.appendChild(watchsong);
    var icon = document.createElement('I');
    icon.setAttribute("class","play icon");
    item.appendChild(icon);
    var content = document.createElement('DIV');
    content.setAttribute("class","content");
    var header = document.createElement('DIV');
    header.setAttribute("class","header");
    var span = document.createElement('SPAN');
    span.innerHTML = songName;
    header.appendChild(span);
    var span = document.createElement('SPAN');
    span.setAttribute('class','beru-only-desktop low-weight beru-text-color');
    var artists = this.parentNode.getElementsByTagName("artist")
    var artist = [];
    for( var i = 0 ; i < artists.length ; i++ ){
      if( this.getAttribute("id") != artists[i].getAttribute("id") ){ artist.push( artists[i].getAttribute("name") ); }
    }
    var artistName = artist.join(" & ");
    span.innerHTML = ' Feat. '+artistName;
    if( artist.length > 0 ){header.appendChild(span);}
    content.appendChild(header);
    item.appendChild(content);
    div.appendChild(item);
  });
  document.getElementById('search-result').appendChild( div );
}

//set tittle
function setTitle( song , imgsrc , artistid ){
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
  titlespancontainer.setAttribute("style","display:inline-block;");
  //set artists names
  var artistContainer = document.createElement('DIV');
  artistContainer.setAttribute("class","beru-artist");
  var artists = song.getElementsByTagName("artist");
  for( var j = 0 ; j < artists.length ; j++ ){
    var span = document.createElement('A');
    span.setAttribute("href","?artist="+artists[j].getAttribute("id") );
    span.innerHTML = artists[j].getAttribute("name");
    artistContainer.appendChild(span);
    if( j < artists.length - 1 ){
      var span = document.createElement('SPAN');
      span.innerHTML = " & ";
      artistContainer.appendChild(span);
    }
  }
  titlespancontainer.appendChild(artistContainer);
  //namesong
  var span = document.createElement('DIV');
  span.setAttribute("class","beru-song");
  span.innerHTML = song.getAttribute("name");
  titlespancontainer.appendChild(span);
  h2.appendChild(titlespancontainer);
  div.appendChild(h2);
  //icon settings
  var setting = document.createElement("A");
  setting.setAttribute("class","ui right floated header beru-title");
  setting.setAttribute("style","padding-top: 15px;position: absolute;right: 0px;");
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
  item.setAttribute("class","item");
  if( tab == "Letra") item.setAttribute("class","item active");
  item.setAttribute("data-tab","Letra");
  item.setAttribute("onclick","localStorage.setItem('tab','Letra');");
  item.innerHTML="Letra";
  div.appendChild(item);
  var item = document.createElement('A');
  item.setAttribute("class","item");
  if( tab == "Acordes") item.setAttribute("class","item active");
  item.setAttribute("data-tab","Acordes");
  item.setAttribute("onclick","localStorage.setItem('tab','Acordes');");
  item.innerHTML="Acordes";
  div.appendChild(item);
  document.getElementById('search-result').appendChild( div );
}

//set letras
function setLetras( song , orden ){
  var div = document.createElement('DIV')  ;
  div.setAttribute("class","ui tab");
  if( tab == "Letra") div.setAttribute("class","ui active tab");
  div.setAttribute("data-tab","Letra");
  var container = document.createElement('DIV');
  container.setAttribute("class","ui center aligned segment");
  var songcontainer = document.createElement('DIV');
  songcontainer.setAttribute("class","ui song-container beru-container");
  for( var i = 0 ; i < orden.length ; i++ ){
    if( $( song ).find('lyric[name="'+orden[i]+'"]') ){
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
    }else{
      console.log('error over: '+order[i]);
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
  if( tab == "Acordes") div.setAttribute("class","ui active tab");
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
    divGrid.setAttribute("class","left aligned sixteen wide column beru-title-order");
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
