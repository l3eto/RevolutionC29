var modifynote = function( tone ){
  var mayors = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  var minors = ['Am','A#m','Bm','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m'];
  $('.beru-note').each(function() {
    var posma = mayors.indexOf( $(this).html() );
    var posmi = minors.indexOf( $(this).html() );
    if( posma > -1 ){$( this ).html( mayors[posma+tone] );}
    else if( posmi > -1 ){$( this ).html( minors[posmi+tone] );}
    else{alert('we cant update this note: '+$(this).html());}
  });
}

var shownote = function( element ){
  $('.ui.modal.note').find('.ui.center.aligned.header').html( $(element).html() );
  $('.ui.modal.note').modal({blurring: true}).modal('show').modal('setting', 'transition', 'scale');
}
