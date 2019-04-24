const axios = require("axios");
const path = require("path");
const dotenv = require('dotenv').config({ path: '/Users/ptascio/Documents/MyTrilogyHWs/hopsifyV2/.env' });
console.log('this is loaded');
console.log(dotenv);


exports.spotify = {
  id: process.env.SPOTIFY_KEY,
  secret: process.env.SPOTIFY_SECRET
};


const axiosReq =  {
    fetchAll: () => {axios.get("https://www.google.com/")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {

    });
  }
};

module.exports = axiosReq;
