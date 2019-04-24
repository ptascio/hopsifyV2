const axios = require("axios");
const path = require("path");
const dotenv = require('dotenv').config({ path: '/Users/ptascio/Documents/MyTrilogyHWs/hopsifyV2/.env' });
console.log('this is loaded');


// axios.defaults.headers.common['Authorization'] = "Basic "+ process.env.SPOTIFY_KEY+":" + process.env.SPOTIFY_SECRET;
const querystring = require('querystring');
console.log(axios.defaults);
exports.spotify = {
  id: process.env.SPOTIFY_KEY,
  secret: process.env.SPOTIFY_SECRET
};


const axiosReq =  {
    fetchToken: () => {axios({
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
      console.log("axios response:" + JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("axios error: " + error);
    });
  }
};

module.exports = axiosReq;
