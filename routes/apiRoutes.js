const axxxios = require("./axiosRoutes");

module.exports = (app, dotenv) => {
  app.get("/api/all", (req, res) => {
    axxxios.fetchAll();
  });
};
