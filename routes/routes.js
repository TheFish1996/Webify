const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
const {
  getUserInfo,
  UsTop50,
  GlobalTop50,
  GlobalViral50,
  UsViral50,
  getSpecificSong
} = require("../routes/Spotify-Routes/spotifyRoutes");
const { addSong, getAllSharedSongs, appendComment, getSpecificCategory } = require("../data/songsMongo");
const { addUser, getUser, appendSharedSong} = require("../data/users");


const client_id = "0edee0583a08407fa148378bb88dcf68"; // Your client id thats provided form our application
const client_secret = "7807b53ecdff4da3a2325ce589b798d2"; // Your secret id thats provided form our application
const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri thats added to our app via spotify. If the redirect uri isnt added to spotify acount app, it wont work

/******************************************************************************************************************
 *
 *                                     ALL GET ENDPOINTS RELATED TO WEBIFY API
 *
 ******************************************************************************************************************/
router.get("/", (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let uri = "http://localhost:3000/songs"; //uri that is used after a successful callback and its our "logged" page
    res.redirect(uri + "?access_token=" + access_token); // after the access token is gotten it will redirect to the the "logged" page with the access token in the header
  } else {
    res.render("authentication/static", {}); // default path thats just login
  }
});
router.get("/login", function(req, res) {
  //path that hits the authorization path of spotify
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: "user-read-private user-read-email", //read rights that sptofy authorizes after successful login
        redirect_uri //redirect uri after successful authorization.
      })
  );
});
router.get("/songs", async function(req, res) {
  //songs path
  let access_token = req.query.access_token; //pulls access token from header. If possible maybe make the access token a cookie?
  let data = await getUserInfo(access_token); //this will return a promise passing in the options object and returning the resulting data
  let GlobalTop50Data = await getSpecificCategory("GlobalTop50")  //queries database specifically for posts by category
  let GlobalViral50Data = await getSpecificCategory("GlobalViral50") //queries database specifically for posts by category
  let USViral50Data = await getSpecificCategory("UnitedStatesViral50") //queries database specifically for posts by category
  let USTop50Data = await getSpecificCategory("UsTop50")

  let AllSharedSongs = await getAllSharedSongs();
  let profilePicture = "/public/img/no-profile-picture-icon.jpg"; //if the image array is zero that means there is no image and should default to this
  let recentlySharedSong = "";
  if (data.images.length === 1) {
    profilePicture = data.images[0].url;
  }

  //find user by id
  const foundUser = await getUser(data.display_name)
  if(foundUser){
    recentlySharedSong = foundUser.shared_tracks[foundUser.shared_tracks.length - 1] //getting recently shared song
  }
  else{
    const newUser = await addUser(data.display_name)

  }
  


  res.render("authentication/songs", {
    profilePicture: profilePicture,
    Name: data.display_name,
    followers: data.followers.total,
    WebName: data.display_name,
    recentlySharedSong: recentlySharedSong,
    commentData: AllSharedSongs,
    USTop50Data: USTop50Data,
    GlobalTop50Data: GlobalTop50Data,
    GlobalViral50Data: GlobalViral50Data,
    USViral50Data: USViral50Data
  });
});

router.get("/UsTop50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let data = await UsTop50(access_token);
    let user_Info = await getUserInfo(access_token);

    let first5Songs = data.slice(0, 5);
    let sixThrough10 = data.slice(5, 10);
    let elThrough15 = data.slice(10, 15);
    let sixtThrough20 = data.slice(15, 20);
    let twenThrough25 = data.slice(20, 25);
    let twenThrough30 = data.slice(25, 30);
    let thirtyoneThrough35 = data.slice(30, 35);
    let thirtysixThrough40 = data.slice(35, 40);
    let fortyoneThrough45 = data.slice(40, 45);
    let fortysixThrough50 = data.slice(45, 50);

    res.render("authentication/AllPlaylists", {
      first5Songs: first5Songs,
      sixthrough10: sixThrough10,
      ellevenThrough15: elThrough15,
      sixteenThrough20: sixtThrough20,
      twentyThrough25: twenThrough25,
      twenThrough30: twenThrough30,
      thirtyoneThrough35: thirtyoneThrough35,
      thirtysixThrough40: thirtysixThrough40,
      fortyoneThrough45: fortyoneThrough45,
      fortysixThrough50: fortysixThrough50,
      Selected_Category: "UsTop50",
      User: user_Info.display_name
    });
  }
});
router.get("/GlobalTop50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let data = await GlobalTop50(access_token);
    let user_Info = await getUserInfo(access_token);

    let first5Songs = data.slice(0, 5);
    let sixThrough10 = data.slice(5, 10);
    let elThrough15 = data.slice(10, 15);
    let sixtThrough20 = data.slice(15, 20);
    let twenThrough25 = data.slice(20, 25);
    let twenThrough30 = data.slice(25, 30);
    let thirtyoneThrough35 = data.slice(30, 35);
    let thirtysixThrough40 = data.slice(35, 40);
    let fortyoneThrough45 = data.slice(40, 45);
    let fortysixThrough50 = data.slice(45, 50);

    res.render("authentication/AllPlaylists", {
      first5Songs: first5Songs,
      sixthrough10: sixThrough10,
      ellevenThrough15: elThrough15,
      sixteenThrough20: sixtThrough20,
      twentyThrough25: twenThrough25,
      twenThrough30: twenThrough30,
      thirtyoneThrough35: thirtyoneThrough35,
      thirtysixThrough40: thirtysixThrough40,
      fortyoneThrough45: fortyoneThrough45,
      fortysixThrough50: fortysixThrough50,
      Selected_Category: "GlobalTop50",
      User: user_Info.display_name
    });
  } else {
  }
});
router.get("/GlobalViral50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let data = await GlobalViral50(access_token);
    let user_Info = await getUserInfo(access_token);
    let first5Songs = data.slice(0, 5);
    let sixThrough10 = data.slice(5, 10);
    let elThrough15 = data.slice(10, 15);
    let sixtThrough20 = data.slice(15, 20);
    let twenThrough25 = data.slice(20, 25);
    let twenThrough30 = data.slice(25, 30);
    let thirtyoneThrough35 = data.slice(30, 35);
    let thirtysixThrough40 = data.slice(35, 40);
    let fortyoneThrough45 = data.slice(40, 45);
    let fortysixThrough50 = data.slice(45, 50);

    res.render("authentication/AllPlaylists", {
      first5Songs: first5Songs,
      sixthrough10: sixThrough10,
      ellevenThrough15: elThrough15,
      sixteenThrough20: sixtThrough20,
      twentyThrough25: twenThrough25,
      twenThrough30: twenThrough30,
      thirtyoneThrough35: thirtyoneThrough35,
      thirtysixThrough40: thirtysixThrough40,
      fortyoneThrough45: fortyoneThrough45,
      fortysixThrough50: fortysixThrough50,
      Selected_Category: "GlobalViral50",
      User: user_Info.display_name
    });
  } else {
  }
});

router.get("/UnitedStatesViral50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let data = await UsViral50(access_token);
    let user_Info = await getUserInfo(access_token);

    let first5Songs = data.slice(0, 5);
    let sixThrough10 = data.slice(5, 10);
    let elThrough15 = data.slice(10, 15);
    let sixtThrough20 = data.slice(15, 20);
    let twenThrough25 = data.slice(20, 25);
    let twenThrough30 = data.slice(25, 30);
    let thirtyoneThrough35 = data.slice(30, 35);
    let thirtysixThrough40 = data.slice(35, 40);
    let fortyoneThrough45 = data.slice(40, 45);
    let fortysixThrough50 = data.slice(45, 50);

    res.render("authentication/AllPlaylists", {
      first5Songs: first5Songs,
      sixthrough10: sixThrough10,
      ellevenThrough15: elThrough15,
      sixteenThrough20: sixtThrough20,
      twentyThrough25: twenThrough25,
      twenThrough30: twenThrough30,
      thirtyoneThrough35: thirtyoneThrough35,
      thirtysixThrough40: thirtysixThrough40,
      fortyoneThrough45: fortyoneThrough45,
      fortysixThrough50: fortysixThrough50,
      Selected_Category: "UnitedStatesViral50",
      User: user_Info.display_name
    });
  } else {
  }
});

/******************************************************************************************************************
 *
 *                                     ALL POST ENDPOINTS RELATED TO WEBIFY API
 *
 ******************************************************************************************************************/
router.post("/songs", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    let Users_comment = req.body["users-submitted-comment"]; //gets users comment from form post
    let Submitted_category = req.body["Category"]; //gets category submitted from, form post
    let UserThatSubmitted = req.body["User"]; //specific user that submitted the post from form post
    let songReferenceID = req.body["songReferenceId"]; //gets the song reference id from the post from form
    let profilePicture = "/public/img/no-profile-picture-icon.jpg"; //if the image array is zero that means there is no image and should default to this, just so it can be added to database

    try {
      let user_Info = await getUserInfo(access_token);
      if (user_Info.images.length === 1)
        profilePicture = user_Info.images[0].url;

      //Song data pulled from spotify
      const CorrectAPIData = await getSpecificSong(access_token, songReferenceID);
      const Artist_Name = CorrectAPIData.album.artists[0].name;
      const Album_Cover = CorrectAPIData.album.images[0].url;
      const Song_Name = CorrectAPIData.name;
      const Stream_url = `https://open.spotify.com/embed/track/${songReferenceID}`;

      await appendSharedSong(UserThatSubmitted, Song_Name)


      //add the song
      const sharedSong = await addSong(UserThatSubmitted, profilePicture, Users_comment, Submitted_category, Artist_Name, Song_Name, Album_Cover, Stream_url); //adding all data to database
      res.send(sharedSong);
    } catch (error) {
      throw ("Something went wrong: ", error);
    }
  } 
});

//append a comment? dont know yet will figure out next
router.post("/songs/comments", async (req, res) => {
  const access_token = req.headers.cookie;
  const data = req.body;
  if (access_token) {
    let ReferenceIDDatabase = req.body.dataBaseID;  //database reference id
    let UserPostingNewComment = req.body.UserPostingNewComment  //User appending to comments
    let commentText = req.body.newlyAddedComment     //comment word 
    
    let appendedComment = await appendComment(ReferenceIDDatabase, UserPostingNewComment,commentText)
    res.send(appendedComment)

  } 
});

/******************************************************************************************************************
 *
 *                                     Helper callback for Spotify API OAuth
 *
 ******************************************************************************************************************/
router.get("/callback", function(req, res) {
  //redirect uri path  // IF YOU HIT THIS PATH THERE IS AN ERROR AKA ITS A CALLBACK, AND IT NEVER REDIRECTS THROUGH LOGIN
  authorized = true;
  let code = req.query.code || null;
  let authOptions = {
    //this object is to retrieve a token from the spotify after a sucessful login.
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    //this request takes the object and hits sptofys api which in the response of the body returns the token
    let access_token = body.access_token; //access token taken from body

    let uri = "http://localhost:3000/songs"; //uri that is used after a successful callback and its our "logged" page
    res.redirect(uri + "?access_token=" + access_token); // after the access token is gotten it will redirect to the the "logged" page with the access token in the header
    //IMPORTANT: ACCESS TOKEN HAS A 1 HOUR TIMEOUT PER SPOTIFY
  });
});
module.exports = router;
