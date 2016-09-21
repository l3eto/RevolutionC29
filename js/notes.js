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
  this._song = null;
  this._randomMode = false;
  this._songs = [];
  this._index = null;
  this.setSongs(artist);
}

Playlist.prototype.setSongs = function( artist ){
  var songs = [];
  var that = this;
  $( artist ).each(function(){
    var src = this.getAttribute("name")+" - "+this.parentNode.parentNode.getAttribute("name");
    var audio = new Audio( "../audio/"+encodeURI(src)+".mp3");
    audio.song = this.parentNode.parentNode.getAttribute("name");
    audio.artist = this.getAttribute("name");
    audio.addEventListener('load', function(){that.songLoaded(audio);}, false);
    audio.addEventListener('ended', function(){that.songEnded();}, false);
    songs.push( audio );
  });
  this._songs = songs;
}

Playlist.prototype.songEnded = function(){
  if( this._randomSong == true ){
    
  }else{
    this.forwardSong();
  }
}

Playlist.prototype.songLoaded = function( audio ){
  console.log( 'loaded: '+audio.song );
}

Playlist.prototype.setIndex = function( index ){
  this._index = index;
}

Playlist.prototype.setSong = function(){
  this._song = this._songs[this._index];
}

Playlist.prototype.setTitleSong = function(){
  window.document.title = this._song.song + " | Revolution C29";
}

Playlist.prototype.restoreTitle = function(){
  window.document.title = "Buscar | Revolution C29";
}

Playlist.prototype.playSong = function(){
  if( this._index == null ){ this.setIndex(0);this.setSong();}
  this.setTitleSong();
  if( this._song.paused ){
    this._song.play();
    this.setPlayColor();
  }else{
    this.pauseSong();
  }
}

Playlist.prototype.pauseSong = function(){
  if( this._index == null ){ this.setIndex(0);this.setSong();}
  this._song.pause();
  this.restoreColor();
}

Playlist.prototype.stopSong = function(){
  if( this._index == null ){ this.setIndex(0);this.setSong();}
  this.restoreTitle();
  this.pauseSong();
  this._song.currentTime = 0
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
    this.setSong();
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

Playlist.prototype.backwardSong = function(){
  this.stopSong();
  this.decreaseIndex();
  this.setSong();
  this.playSong();
}

Playlist.prototype.forwardSong = function(){
  this.stopSong();
  this.increaseIndex();
  this.setSong();
  this.playSong();
}

Playlist.prototype.randomMode = function(){
  alert('estamos trabajando en esta funcion, gracias.');
  this._randomMode =! this._randomMode;
}
