var modifynote = function( tone ){
  var mayors = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  var minors = ['Am','A#m','Bm','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m'];
  $('.beru-note').each(function() {
    var posma = mayors.indexOf( $(this).html() );
    var posmi = minors.indexOf( $(this).html() );
    if( posma > -1 ){var pos = posma;var vect = mayors;}
    if( posmi > -1 ){var pos = posmi;var vect = minors;}
    if( posma == -1 && posmi == -1){alert('Lo Sentimos, ha ocurridou un error');window.location.reload();};
    if( pos+tone >= vect.length  ){
      $( this ).html( vect[posma+tone-vect.length] );
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
