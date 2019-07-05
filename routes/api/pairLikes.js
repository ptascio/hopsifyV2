var pairLikesController = require("../../controllers/pairLikesController");

module.exports = (app) => {
  app.get("/api/findPairs/:band/:track/:beerName", pairLikesController.findPair);
};
