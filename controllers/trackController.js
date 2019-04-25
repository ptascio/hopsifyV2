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
    console.log(req.query);
    if(spotifyToken && artist && track){
      axios.fetchTrackByName(artist, track, spotifyToken).then((response) => {
        console.log("Yes, in API response");
        console.log(response.items[0].id);
      });
    }else{
      res.json("Sorry, something went wrong. Did you fill in both fields?");
    }
  });
};
