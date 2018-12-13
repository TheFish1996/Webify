const rp = require("request-promise");

const getUserInfo = async accessToken => {
  const options = {
    //object used to hit spotifys api to get the data we need
    method: "GET",
    uri: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };
  let something = await rp(options);
  return something;
};

const UsTop50 = async accessToken => {
  const options = {
    //object used to hit spotifys api to get the data we need
    method: "GET",
    uri: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };
  let data = await rp(options);
  return data.tracks.items;
};



module.exports = {
  getUserInfo,
  UsTop50
};
