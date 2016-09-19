var upnote = function( note , tone ){
  var note = new note( note );
  note.up( tone );
}

var shownote = function( element ){
  console.log(element);
  console.log( $(element).html() );
  $('.ui.modal.note').find('.header').html( element.innerHTML );
  $('.ui.modal.note').modal({blurring: true}).modal('show').modal('setting', 'transition', 'scale');
}

var note = function(){
  this.notes = [
    'Am','A','A#',
    'Bm','B',
    'Cm','C','C#',
    'Dm','D','D#',
    'Em','E',
    'Em','F','F#',
    'Gm','G','G#'
  ]
}
