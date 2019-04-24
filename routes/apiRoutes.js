const axios = require("./axiosRoutes");
var spotifyToken;


module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
  });

  app.get("/api/track", (req, res) => {
    if(spotifyToken){
      axios.fetchTrack(spotifyToken, "11dFghVXANMlKmJXsNCbNl");
    }
  });
};
