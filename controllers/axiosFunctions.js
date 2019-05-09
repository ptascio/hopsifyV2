const axios = require("axios");
const path = require("path");
const dotenv = require('dotenv').config({ path: '/Users/ptascio/Documents/MyTrilogyHWs/hopsifyV2/.env' });
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
      return response.data.access_token;
    })
    .catch((error) => {
      console.log("axios error: " + error);
    });
  },

  fetchTrackByNameAndArtist: (artist, song, spotifyToken) => {
    var queryUrl = `https://api.spotify.com/v1/search?q=artist:${artist}+track:${song}&type=track`;
    return axios({
      url: queryUrl,
      method: "get",
      headers: {
        "Authorization": `Bearer ${spotifyToken}`,
      }
    })
    .then((track) => {
      return track.data.tracks;
    })
    .catch((error) => {
      console.log("track error: " + error);
    });
  },
  //GET https://api.spotify.com/v1/audio-analysis/{id}
  fetchTrackById: (spotifyToken, kind, id) => {
    return axios({
      url: `https://api.spotify.com/v1/${kind}/${id}`,
      method: "get",
      headers: {
        "Authorization": `Bearer ${spotifyToken}`,
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("axios error: " + error);
    });
  }

};

module.exports = axiosReq;
