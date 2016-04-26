var song_home = null;

$( document ).ready(function() {

  $('.ui.huge.black.button.home').click( function(){
      window.location.href = '../events/';
  });
  
  document.getElementById("bgvid").addEventListener('ended', function(){
  // only functional if "loop" is removed 
  this.pause();
    // to capture IE10
  vidFade( this );
  });
  
  function vidFade( vid ) {
    vid.classList.add("stopfade");
  }
  //song_home = new Audio('../audio/Hillsong Young & Free - Wake.mp3');
  //song_home.play();


});
