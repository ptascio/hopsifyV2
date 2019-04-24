const axios = require("./axiosFunctions");
var spotifyToken;


module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
  });

  app.get("/api/track", (req, res) => {
    if(spotifyToken){
      axios.fetchTrackByName("metallica", "sad but true", spotifyToken);
    }
  });
};
