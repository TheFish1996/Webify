$.ajax({
  url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US",
  headers: {
    Authorization: "Bearer " + document.cookie
  },
  dataType: "json",
  success: function(body) {
    for (let i = 0; i < body.tracks.items.length; i++) {
      let songID = body.tracks.items[i].track.id;
      let songName = body.tracks.items[i].track.name;
      let testing = `https://open.spotify.com/embed/track/${songID}`;
      $(`#song${i}`).attr("src", testing);
      $(`.title${i}`).append(songName);
      //body.tracks.items[i].track.name
      // //body.tracks.items[i].whatever property you need
      // /*body.display_name*/);
      //}
    }
  },
  error: function() {
    console.log("Error retrieving spotify API");
  }
});
