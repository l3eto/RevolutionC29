$( document ).ready(function() {
    $('.menu.m1 .item.i1').tab();
    $('.menu.m2 .item.i2').tab();
});

var songs = null;
var songsNames = [
  {'src':'Kike Pavón - La Experiencia de Adorar','autor':'Kike Pavón','song':'La Experiencia de Adorar'},
  {'src':'Evan Craft - Gracia Sublime Es','autor':'Evan Craft','song':'Gracia Sublime Es'},
  {'src':'Kike Pavón - En Tu Nombre','autor':'Kike Pavón','song':'En Tu Nombre'},
  {'src':'Evan Craft - Vives en Mí','autor':'Evan Craft','song':'Vives en Mí'}
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
    var audio = new Audio( '../audio/' + encodeURIComponent( this._songs[i].src ) + '.mp3' );
    this._songs[i].tab = 'song-' + (parseInt(i)+1).toString();
    audio.setAttribute('song',this._songs[i].song);
    audio.setAttribute('autor',this._songs[i].autor);
    audio.addEventListener('canplaythrough', this.addAudio.bind( this, audio , i ), false);
  }
};

Songs.prototype.setActualSong = function () {
  if( this._audios._actual ) this._audios._actual.pause();
  this._audios._actual = this._audios[ $('#' + $('.item.i1.active').html() ).find( $('.item.i2.active') ).attr("data-tab") ];
};

Songs.prototype.loaded = function () {
  $('.item.song.disabled').removeClass('disabled');
  $('.item.backward.song').click(function(){this.backward();}.bind(this));
  $('.item.play.song').click(function(){this.play();}.bind(this));
  $('.item.stop.song').click(function(){this.stop();}.bind(this));
  $('.item.forward.song').click(function(){this.forward();}.bind(this));
};

Songs.prototype.backward = function(){
  this.stop();
  $('#' + $('.item.i1.active').html() ).find(':contains("'+this.getActualSong().song+'")').removeClass('active');
  $('#' + $('.item.i1.active').html() ).find('div[data-tab="'+this.getActualSong().tab+'"]').removeClass('active');
  $('#' + $('.item.i1.active').html() ).find(':contains("'+this.getPreviousSong().song+'")').addClass('active');
  $('#' + $('.item.i1.active').html() ).find('div[data-tab="'+this.getPreviousSong().tab+'"]').addClass('active');
  $('.menu.m1 .item.i1').tab();
  $('.menu.m2 .item.i2').tab();
  this.play();
}

Songs.prototype.forward = function(){
  this.stop();
  $('#' + $('.item.i1.active').html() ).find(':contains("'+this.getActualSong().song+'")').removeClass('active');
  $('#' + $('.item.i1.active').html() ).find('div[data-tab="'+this.getActualSong().tab+'"]').removeClass('active');
  $('#' + $('.item.i1.active').html() ).find(':contains("'+this.getNextSong().song+'")').addClass('active');
  $('#' + $('.item.i1.active').html() ).find('div[data-tab="'+this.getNextSong().tab+'"]').addClass('active');
  $('.menu.m1 .item.i1').tab();
  $('.menu.m2 .item.i2').tab();
  this.play();
}

Songs.prototype.getActualSong = function(){
  if( !this._audios._actual ) return this._songs[0];
  for( i in this._songs ){
    if( this._audios._actual.getAttribute('song') == this._songs[i].song ) return this._songs[i];
  }
}

Songs.prototype.getNextSong = function(){
  if( !this._audios._actual ) return this._songs[1];
  for( i in this._songs ){
    if( this._audios._actual.getAttribute('song') == this._songs[i].song ){
      if( this._songs[parseInt(i)+1] ) return this._songs[ parseInt(i)+1];
      else return this._songs[0];
    }
  }
}

Songs.prototype.getPreviousSong = function(){
  if( !this._audios._actual ) return this._songs[this._songs.length-1];
  for( i in this._songs ){
    if( this._audios._actual.getAttribute('song') == this._songs[i].song ){
      if( this._songs[parseInt(i)-1] ) return this._songs[ parseInt(i)-1];
      else return this._songs[this._songs.length-1];
    }
  }
}

Songs.prototype.play = function(){
  this.setActualSong();
  $('.item.play.song').removeClass('play').addClass('pause').removeClass('song').addClass('song');
  $('.icon.play').removeClass('play').addClass('pause');
  $('.item.pause.song').click(function(){this.pause();}.bind(this));
  this._audios._actual.play();
}

Songs.prototype.pause = function(){
  this.setActualSong();
  $('.item.pause.song').removeClass('pause').addClass('play').removeClass('song').addClass('song');
  $('.icon.pause').addClass('play').removeClass('pause');
  $('.item.play.song').click(function(){this.play();}.bind(this));
  this._audios._actual.pause();
}

Songs.prototype.stop = function(){
  this.setActualSong();
  this._audios._actual.currentTime = 0;
  this.pause();
}
