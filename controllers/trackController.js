const axios = require("./axiosFunctions");
var spotifyToken;


module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
  });

  app.get("/api/track", (req, res) => {
    console.log("in get request");
    var artist = req.query.artistName;
    var track = req.query.trackName;
    if(spotifyToken && artist && track){
      axios.fetchTrackByName(artist, track, spotifyToken).then((response) => {
        console.log("Yes, in API response");
        res.json(response.items);
      });
    }else{
      res.json("Sorry, something went wrong. Did you fill in both fields?");
    }
  });
};
