const axios = require("./axiosFunctions");
var spotifyToken;
var db = require("../models");


module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
    console.log("token: " + spotifyToken);
  });

  app.get("/api/track", (req, res) => {
    console.log("in get request");
    var artist = req.query.artistName;
    var track = req.query.trackName;



    if(spotifyToken && artist && track){
      db.TrackSearch.create({
        track_name: req.query.trackName,
        artist_name: req.query.artistName
      }).then(() => {
        axios.fetchTrackByName(artist, track, spotifyToken).then((response) => {
          console.log("Yes, in API response");
          res.json(response);
        });
      });
    }else{
      console.log("request failed");
      res.json("Sorry, something went wrong. Did you fill in both fields?");
    }
  });
};
