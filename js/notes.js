var modifynote = function( tone ){
  var mayors = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  var mayors9 = ['A9','A#9','B9','C9','C#9','D9','D#9','E9','F9','F#9','G9','G#9'];
  var mayors7 = ['A7','A#7','B7','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7'];
  var mayorsG = ['F#/A#','G/B','G#/C','A/C#','A#/D','B/D#','C/E','C#/F','D/F#','D#/G','E/G#','F/A'];
  var minors = ['Am','A#m','Bm','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m'];
  var minors9 = ['Am9','A#m9','Bm9','Cm9','C#m9','Dm9','D#m9','Em9','Fm9','F#m9','Gm9','G#m9'];
  var minors7 = ['Am9','A#m9','Bm9','Cm9','C#m9','Dm9','D#m9','Em9','Fm9','F#m9','Gm9','G#m9'];
  $('.beru-note').each(function() {
    var pos = null;
    var vect = null;
    var posma = mayors.indexOf( $(this).html() );
    var posma9 = mayors9.indexOf( $(this).html() );
    var posma7 = minors7.indexOf( $(this).html() );
    var posmaG = mayorsG.indexOf( $(this).html() );
    var posmi = minors.indexOf( $(this).html() );
    var posmi9 = minors9.indexOf( $(this).html() );
    var posmi7 = minors7.indexOf( $(this).html() );
    if( posma > -1 ){pos = posma;vect = mayors;}
    if( posma9 > -1 ){pos = posma9;vect = mayors9;}
    if( posma7 > -1 ){pos = posma7;vect = mayors7;}
    if( posmaG > -1 ){pos = posmaG;vect = mayorsG;}
    if( posmi > -1 ){pos = posmi;vect = minors;}
    if( posmi9 > -1 ){pos = posmi9;vect = minors9;}
    if( posmi7 > -1 ){pos = posmi7;vect = minors7;}
    if( pos == null && vect == null ){console.log($(this).html());alert('Lo Sentimos, ha ocurridou un error');window.location.reload();};
    if( pos+tone >= vect.length  ){
      $( this ).html( vect[pos+tone-vect.length] );
    }else if( pos+tone < 0  ){
      $( this ).html( vect[pos+tone+vect.length] );  
    }else{
      $( this ).html( vect[pos+tone] );
    }
  });
}

var shownote = function( element ){
  $('.ui.modal.note').find('.ui.center.aligned.header').html( $(element).html() );
  $('.ui.modal.note').modal({blurring: true}).modal('show').modal('setting', 'transition', 'scale');
}

var Playlist = function( artist ){
  this._song = null;
  this._songs = [];
  this._index = null;
  this.setSongs(artist);
}

Playlist.prototype.setSongs = function( artist ){
  var songs = [];
  $( artist ).each(function(){
    var src = this.getAttribute("name")+" - "+this.parentNode.parentNode.getAttribute("name");
    var audio = new Audio( "../audio/"+encodeURI(src)+".mp3");
    songs.push( audio );
  });
  this._songs = songs;
}

Playlist.prototype.setIndex = function( index ){
  this._index = index;
}

Playlist.prototype.setSong = function(){
  this._song = this._songs[this._index];
}

Playlist.prototype.playSong = function(){
  if( this._index == null ){ this.setIndex(0);this.setSong();}
  this._song.play();
}

Playlist.prototype.pauseSong = function(){
  this._song.pause();
}

Playlist.prototype.stopSong = function(){
  this.pauseSong();
  this._song.currentTime = 0
}

Playlist.prototype.clickOnItem = function( item ){
  this.setIndex( $( '.ui.selection.list .item.beru-item' ).index( item ) );
  this.stopSong();
  this.setSong();
  this.playSong();
}

Playlist.prototype.decreaseIndex = function(){

Playlist.prototype.backwardSong = function(){
  this.stopSong();
  if( this._index - 1 < 0  ){this.setIndex( this._songs.length );}
  else{ this._index -= 1;}
}

Playlist.prototype.forwardSong = function(){
  
}

Playlist.prototype.randomMode = function(){
  
}
