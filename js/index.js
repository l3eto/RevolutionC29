var songs = null;
var beru = null;
var songsNames = [
  {
    'src':'Kike Pavón - La Experiencia de Adorar',
    'autor':'Kike Pavón',
    'song':'La Experiencia de Adorar'
  },
  {
    'src':'Evan Craft - Gracia Sublime Es',
    'autor':'Evan Craft',
    'song':'Gracia Sublime Es'
  },
  {
    'src':'Kike Pavón - En Tu Nombre',
    'autor':'Kike Pavón',
    'song':'En Tu Nombre'
  },
  {
    'src':'Evan Craft - Vives en Mí',
    'autor':'Evan Craft',
    'song':'Vives en Mí'
  }
];

var number = {
  '1':'one',
  '2':'two',
  '3':'three',
  '4':'four',
  '5':'five',
  '6':'six'
}

var controls = [
  {'a':'item backward song disabled','i':'icon step backward'},
  {'a':'item play song disabled','i':'icon play'},
  {'a':'item stop song disabled','i':'icon stop'},
  {'a':'item forward song disabled','i':'icon step forward'}
]





$( document ).ready(function() {
  //create elements
  beru = new Elements();

  //mode container
  beru.getById('Letras');
  beru.save();
  beru.new('div');
  beru.add('class','ui '+ number[ songsNames.length ]+' item menu m2');
  beru.addToSave();
  beru.save();
  //add songs
  for( i in songsNames ){
    beru.new('a');
    beru.add('class','item i2');
    beru.add('data-tab','song-' + (parseInt(i)+1).toString() );
    beru.add( songsNames[i].song );
    beru.addToSave();
  }

  //control container
  beru.getById('Letras');
  beru.save();
  beru.new('div');
  beru.add('class','ui fluid '+ number[ controls.length ] +' item menu');
  beru.addToSave();
  beru.save();
  //add controls
  for( i in controls ){
    beru.new('a');
    beru.add('class', controls[i].a );
    beru.addToSave();
    beru.save();
    beru.new('i');
    beru.add('class', controls[i].i );
    beru.addToSave();
    beru.restore();
  }

  //songs container
  beru.getById('Letras');
  beru.save();
  for( i in songsNames ){
    var dataSong = getData( songsNames[i].autor , songsNames[i].song );
    if( dataSong ){
      beru.new('div');
      beru.add('class','ui tab center aligned segment');
      beru.add('data-tab','song-'+ (parseInt(i)+1).toString() );
      beru.addToSave();
      beru.save();
      beru.new('div');
      beru.add('class', 'ui song-container');
      beru.addToSave();
      beru.save();
      for( j in dataSong.order ){
        if( dataSong.lyrics[ dataSong.order[j] ] ){
          for( k in dataSong.lyrics[ dataSong.order[j] ] ){
            for( var l in dataSong.lyrics[ dataSong.order[j] ][k] ) {
              beru.new( l );
              beru.add( dataSong.lyrics[ dataSong.order[j] ][k][l] );
              beru.addToSave();
            }
          }
          beru.new('br');
          beru.addToSave();
        }
      }
      beru.restore();
      beru.restore();
    }
  }

  //load songs
  songs = new Songs( songsNames );

  if( localStorage.getItem("mode") ){
    $( '#' + $('.item.i1.active').html() ).removeClass('active');
    $( '[data-tab="' + $('.item.i1.active').html() + '"]').removeClass('active');
    $( '#' + localStorage.getItem("mode") ).addClass('active');
    $( '[data-tab="' + localStorage.getItem("mode") + '"]').addClass('active');
  }else{
    $( '#Letras' ).addClass('active');
    $( '[data-tab="' + $('.item.i1.active').html() + '"]').addClass('active');
  }

  if( localStorage.getItem("song") ){
    $( '#' + $('.item.i1.active').html() ).find( '[data-tab="song-1"]' ).removeClass('active');
    $( '#' + $('.item.i1.active').html() ).find( '[data-tab="'+localStorage.getItem("song")+'"]' ).addClass('active');
  }else{
    $( '#' + $('.item.i1.active').html() ).find( '[data-tab="song-1"]' ).addClass('active');
  }

  //basic semantic ui
  $('.menu.m1 .item.i1').tab();
  $('.menu.m2 .item.i2').tab();

  $('.rounded.big.square.icon').hover(function(){
      $(this).addClass('activeicon');
      },function(){
      $(this).removeClass('activeicon');
  });

  $('#facebook-link').click(function(){
    var win = window.open( 'https://www.facebook.com/revolutionc29/', '_blank');
    win.focus();
  })
  $('#instagram-link').click(function(){
    var win = window.open( 'https://www.instagram.com/revolutionc29/', '_blank');
    win.focus();
  })

});

window.onbeforeunload = function() {
  localStorage.setItem( "mode" , $('.item.i1.active').html() );
  localStorage.setItem( "song" , $('#' + $('.item.i1.active').html() ).find( $('.item.i2.active') ).attr("data-tab") );
};

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
