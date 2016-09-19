var modifynote = function( tone ){
  var mayors = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  var mayors9 = ['A9','A#9','B9','C9','C#9','D9','D#9','E9','F9','F#9','G9','G#9'];
  var mayors7 = ['A7','A#7','B7','C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7'];
  var gmayors = ['F#/A#','G/B','G#/C','A/C#','A#/D','B/D#','C/E','C#/F','D/F#','D#/G','E/G#','F/A'];
  var minors = ['Am','A#m','Bm','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m'];
  var minors9 = ['Am9','A#m9','Bm9','Cm9','C#m9','Dm9','D#m9','Em9','Fm9','F#m9','Gm9','G#m9'];
  var minors7 = ['Am9','A#m9','Bm9','Cm9','C#m9','Dm9','D#m9','Em9','Fm9','F#m9','Gm9','G#m9'];
  $('.beru-note').each(function() {
    var posma = mayors.indexOf( $(this).html() );
    var posma9 = mayors.indexOf( $(this).html() );
    var posma7 = minors.indexOf( $(this).html() );
    var gposma = gmayors.indexOf( $(this).html() );
    var posmi = minors.indexOf( $(this).html() );
    var posmi9 = minors9.indexOf( $(this).html() );
    var posmi7 = minors7.indexOf( $(this).html() );
    if( posma > -1 ){var pos = posma;var vect = mayors;}
    if( posma9 > -1 ){var pos = posma9;var vect = mayors9;}
    if( posma7 > -1 ){var pos = posma7;var vect = mayors7;}
    if( gposma > -1 ){var pos = gposma;var vect = gmayors;}
    if( posmi > -1 ){var pos = posmi;var vect = minors;}
    if( posmi9 > -1 ){var pos = posmi9;var vect = minors9;}
    if( posmi7 > -1 ){var pos = posmi7;var vect = minors7;}
    if( posma == -1 && posma9 == -1 && posma7 == -1 && gposma == -1 && posmi9 == -1 && posmi7 == -1 && posmi == -1 ){console.log($(this).html());alert('Lo Sentimos, ha ocurridou un error');window.location.reload();};
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
