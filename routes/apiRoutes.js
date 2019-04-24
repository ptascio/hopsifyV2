const axios = require("./axiosRoutes");
var spotifyToken;

module.exports = (app, dotenv) => {
  app.get("/api/all", (req, res) => {
    axios.fetchToken();
  });
};
