const axios = require("axios");
const path = require("path");
const dotenv = require('dotenv').config({ path: '/Users/ptascio/Documents/MyTrilogyHWs/hopsifyV2/.env' });
console.log('axios is loaded');

const axiosReq =  {
    fetchToken: () => {
      return axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params: {grant_type: 'client_credentials'},
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: process.env.SPOTIFY_KEY,
        password: process.env.SPOTIFY_SECRET
      }
  })
    .then((response) => {
      console.log("in axios");
      return response.data.access_token;
    })
    .catch((error) => {
      console.log("axios error: " + error);
    });
  },
  //GET https://api.spotify.com/v1/audio-analysis/{id}
  fetchTrack: (spotifyToken, id) => {
    console.log(`Bearer ${spotifyToken}`);
    axios({

    url: `https://api.spotify.com/v1/tracks/${id}`,
    method: "get",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${spotifyToken}`,
      "Content-Type": "application/json",

    },
    json: true
  })
  .then((response) => {
    console.log("axios response:"+JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log("axios error: " + error);
  });

  }
};

module.exports = axiosReq;
