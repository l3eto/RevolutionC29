var modifynote = function( element , tone ){
  $('.beru-note').each(function( index ) {
    console.log( index + ": " + $( this ).text() );
  });
}


var Note = function( note ){
  this._mayors = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  this._minors = ['Am','A#m','Bm','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m'];
  if( this._mayors.indexOf( note ) > -1 ){
    var position = this._mayors.indexOf( note );
    console.log(this);
  }else if( this._minors.indexOf( note ) > -1 ){
    var pos = this._minorss.indexOf( note );
    console.log(this);
  }else{
    console.log('cant up this note: '+note);
  }
}


var shownote = function( element ){
  $('.ui.modal.note').find('.ui.center.aligned.header').html( $(element).html() );
  $('.ui.modal.note').modal({blurring: true}).modal('show').modal('setting', 'transition', 'scale');
}
