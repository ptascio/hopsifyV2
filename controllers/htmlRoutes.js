const path = require("path");

module.exports = function(app){
  app.get("/", (req, res) => {
    console.log("wassup");
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });
};
