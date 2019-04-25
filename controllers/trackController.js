const axios = require("./axiosFunctions");
var spotifyToken;


module.exports = (app) => {
  // axios.fetchToken().then((token) => {
  //   spotifyToken = token;
  // });

  app.get("/api/track", (req, res) => {
    console.log("in get request");
    console.log(req.query);
    // if(spotifyToken){
    //   axios.fetchTrackByName("metallica", "sad but true", spotifyToken);
    // }
  });
};
