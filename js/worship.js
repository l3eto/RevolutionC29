//global var
var tab;

$( document ).ready(function(){
  //get acordes or lyrics
  tab = localStorage.getItem("tab");
  if( tab == null ){localStorage.setItem("tab","Letra");tab = "Letra";}
  //tab for songs
  $('#tab-songs.menu .item').tab();
  var songsList = ['w7e4spqw9s','a9hjafko6r'];
  //search especific artist
  readXML("../uploads/xml/songs.xml", function(data){
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
    }else{
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(data);
    }
    for( var k = 0 ; k < songsList.length ; k++ ){
      var div = document.getElementById( (k+1).toString().concat('Song') );
      //get song
      var song = $( xmlDoc ).find('song[id="'+songsList[k]+'"]').get(0);
      //get values
      var artists = song.getElementsByTagName("artist");
      var artist = [];
      for( var j = 0 ; j < artists.length ; j++ ){
        artist.push( artists[j].getAttribute("name") );
      }
      var artistName = artist.join(" & ");
      var songName = song.getAttribute("name");
      var title = artistName+' - '+songName;
      var imgsrc = "../uploads/img/unknow.jpg";
      var artistId = null;
      if( artists[0].getAttribute("id") ){var imgsrc = "../uploads/img/".concat(artists[0].getAttribute("id"),".jpg");artistId=artists[0].getAttribute("id");}
      var orden = song.getAttribute("order").split("-");
      audio = new Audio( '../audio/'+encodeURI(title)+'.mp3');
      audio.addEventListener('ended', function() {
        if( loop == true){this.currentTime = 0;this.play();}else{this.currentTime = 0;this.pause();}
      }, false);
      div.appendChild( getTitle(song,imgsrc,artistId) );
      div.appendChild( getMenu() );
      div.appendChild( getLetras(song,orden) );
      div.appendChild( getAcordes(song,orden) );
      $('#searchSong.menu .item').tab();
      $('.beru-note').click(function(){ shownote( this ); });
    }
  });

});
