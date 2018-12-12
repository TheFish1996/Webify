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



module.exports = {
  getUserInfo
};
