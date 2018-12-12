const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
const { getUserInfo } = require("../routes/Spotify-Routes/spotifyRoutes");
const MainSongFeedCollection = require("../mockData");

const client_id = "0edee0583a08407fa148378bb88dcf68"; // Your client id thats provided form our application
const client_secret = "7807b53ecdff4da3a2325ce589b798d2"; // Your secret id thats provided form our application
const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri thats added to our app via spotify. If the redirect uri isnt added to spotify acount app, it wont work
authorized = false;

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

  let profilePicture = "/public/img/no-profile-picture-icon.jpg"; //if the image array is zero that means there is no image and should default to this
  if (data.images.length === 1) {
    profilePicture = data.images[0].url;
  }

  res.render("authentication/songs", {
    profilePicture: profilePicture,
    Name: data.display_name,
    followers: data.followers.total,
    WebName: data.display_name,
    commentData: MainSongFeedCollection
  });
});
router.get("/UsTop50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
  }
});
router.get("/GlobalTop50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
  }
});
router.get("/GlobalViral50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
  }
});
router.get("/UnitedStatesViral50", async (req, res) => {
  const access_token = req.headers.cookie;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
  }
});

/******************************************************************************************************************
 *
 *                                     ALL POST ENDPOINTS RELATED TO WEBIFY API
 *
 ******************************************************************************************************************/
router.post("/songs", async (req, res) => {
  const access_token = req.headers.cookie;
  const data = req.body;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
  }
});
router.post("/songs/comments", async (req, res) => {
  const access_token = req.headers.cookie;
  const data = req.body;
  if (access_token) {
    console.log("u have an access token");
  } else {
    console.log("u dont have an access token");
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