const axxxios = require("./axiosRoutes");
axxxios.fetchAll();
module.exports = (app, dotenv) => {
  app.get("/api/all", (req, res) => {
    console.log("hi");
  });
};
