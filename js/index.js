$( document ).ready(function() {
    $('.menu.m1 .item.i1').tab();
    $('.menu.m2 .item.i2').tab();
});

var songs = null;
var songsNames = [
  'Kike Pavón - La Experiencia de Adorar',
  'Evan Craft - Gracia Sublime Es',
  'Kike Pavón - En Tu Nombre',
  'Evan Craft - Vives en Mí'
];

window.onload = function(){
  songs = new Songs( songsNames );
}

var Songs = function( songs ){
  this._songs = songs;
  this._audios = {};
  this._audios.length = 0;
  this._audios._actual = null;
  this.addSongs();
}

Songs.prototype.addAudio = function( audio, i, event ){
  this._audios['song-'+ (parseInt(i)+1).toString() ] = audio;
  this._audios.length++;
  if( this._audios.length == this._songs.length ) this.loaded();
}

Songs.prototype.addSongs = function () {
  for( i in this._songs ){
    var audio = new Audio( '../audio/' + encodeURIComponent( this._songs[i] ) + '.mp3' );
    audio.addEventListener('canplaythrough', this.addAudio.bind( this, audio , i ), false);
  }
};

Songs.prototype.setActualSong = function () {
  var tab = $('#' + $('.item.i1.active').html() ).find( $('.item.i2.active') ).attr("data-tab");
  this._audios._actual = this._audios[tab]
};

Songs.prototype.loaded = function () {
  $('.item.song.disabled').removeClass('disabled');
  $('.item.play.song').click(function(){this.play();}.bind(this));
  $('.item.pause.song').click(function(){this.pause();}.bind(this));
  $('.item.stop.song').click(function(){this.stop();}.bind(this));
};

Songs.prototype.play = function(){
  this.setActualSong();
  if(this._audios._actual.paused) this._audios._actual.play();
}

Songs.prototype.pause = function(){
  this.setActualSong();
  if(this._audios._actual.duration > 0 && !this._audios._actual.paused) {
    this._audios._actual.currentTime = 0;
    this._audios._actual.pause();
  }
}

Songs.prototype.stop = function(){
  this.setActualSong();
  if(this._audios._actual.duration > 0 && !this._audios._actual.paused) this._audios._actual.pause();
}
