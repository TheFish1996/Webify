let MainSongFeedCollection = [
  //placeholder for database call just so i can use as a front end reference  //NEED DATABASE CALL WITH THIS OBJECT
  {
    _id: "4XOuT4tFDIYEfh61ra53oQ", //id of song is sptofys specific song reference code cause they all have a unique song reference id
    User: "Jonathan",
    Shared_Commment: "Check this song out!",
    Category: "US Top 50",
    Artist_name: "Testing",
    Song_name: "Hello",
    Album_cover_url: "testing.url",
    Stream_url: "https://open.spotify.com/embed/track/4XOuT4tFDIYEfh61ra53oQ",
    number_dailyplays: 10,
    number_Comments: 15,
    Comments: [
      {
        _id: "e423iu2jkd",
        Text: "User comment",
        UserID: "SpotifyUsername",
        Time: "2018-04-23"
      }
    ]
  },
  {
    _id: "4XOuT4tFDIYEfh61ra53oQ", //id of song is sptofys specific song reference code cause they all have a unique song reference id
    User: "Jonathan",
    Category: "US Top 50",
    Shared_Commment: "Check this song out!",
    Artist_name: "Testing",
    Song_name: "Hello",
    Album_cover_url: "testing.url",
    Stream_url: "https://open.spotify.com/embed/track/4XOuT4tFDIYEfh61ra53oQ",
    number_dailyplays: 10,
    number_Comments: 15,
    Comments: [
      {
        _id: "e423iu2jkd",
        Text: "User comment",
        UserID: "SpotifyUsername",
        Time: "2018-04-23"
      }
    ]
  }
];

module.exports = MainSongFeedCollection;
