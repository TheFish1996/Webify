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
    uri: "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp?market=US",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };
  let data = await rp(options);
  return data.tracks.items;
};

const GlobalTop50 = async accessToken => {
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

const GlobalViral50 = async accessToken => {
  const options = {
    //object used to hit spotifys api to get the data we need
    method: "GET",
    uri: "https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9?market=US",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };
  let data = await rp(options);
  return data.tracks.items;
};

const UsViral50 = async accessToken => {
  const options = {
    //object used to hit spotifys api to get the data we need
    method: "GET",
    uri: "https://api.spotify.com/v1/playlists/37i9dQZEVXbKuaTI1Z1Afx?market=US",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };
  let data = await rp(options);
  return data.tracks.items;
};



module.exports = {
  getUserInfo,
  UsTop50,
  GlobalTop50,
  GlobalViral50,
  UsViral50
};
