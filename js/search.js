//global var
var audio;
var playlist;
var loop = false;
var tab;
var a;
$( document ).ready(function(){
  //div for results
  var resultDiv = document.getElementById('search-result');
  if( resultDiv ){
    //get acordes or lyrics
    tab = localStorage.getItem("tab");
    if( tab == null ){localStorage.setItem("tab","Letra");tab = "Letra";}
    //set songs on search
    setContent();
    //read if some song is on search url
    var searchingsong = getSearchURL('song');
    //read if some artist is on search url
    var searchingartist = getSearchURL('artist');
    //conditionals
    if( searchingsong ){
      //search especific song
      readXML("../uploads/xml/songs.xml", function(data){
        if (window.DOMParser){
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(data, "text/xml");
        }else{
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(data);
        }
        //get song
        var song = $( xmlDoc ).find('song[id="'+searchingsong+'"]').get(0);
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
        document.title = songName+' | Revolution C29';
        audio = new Audio( '../audio/'+encodeURI(title)+'.mp3');
        audio.addEventListener('ended', function() {
          if( loop == true){this.currentTime = 0;this.play();}else{this.currentTime = 0;this.pause();}
        }, false);
        setTitle(song,imgsrc,artistId);
        setMenu();
        setAudio( title );
        setLetras(song,orden);
        setAcordes(song,orden);
        $('.menu .item').tab();
        $('.beru-note').click(function(){ shownote( this ); });
      });
    }else if( searchingartist ){
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
        //get artist
        var artist = $( xmlDoc ).find('artist[id="'+searchingartist+'"]');
        var artistName = artist.get(0).getAttribute("name");
        //playlist
        playlist = new Playlist(artist);
        //set title
        resultDiv.appendChild( getArtistTitle(artistName,searchingartist) );
        setDivition();
        resultDiv.appendChild( getSongs(artist) );
      });
    }else{
      //$('#search-result').remove();
      //show top 5 last updates
      readXML("../uploads/xml/songs.xml", function(data){
        if (window.DOMParser){
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(data, "text/xml");
        }else{
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(data);
        }
        //get 5 latest songs
        var songs = $( xmlDoc ).find('song');
        setTitleNoSearching("thumbs up","5 Últimas Canciones");
        setDivition();
        setLastSongs( songs , 5 );
      });
    }
  }
});
