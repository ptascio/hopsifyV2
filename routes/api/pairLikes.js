var pairLikesController = require("../../controllers/pairLikesController");

module.exports = (app) => {
  app.get("/api/findPairs/:band/:track/:beerName", pairLikesController.findPair);
  app.get("/api/findIfUserLiked/:band/:track/:beerName/:userId", pairLikesController.findIfUserLiked);
  app.post("/api/upVote/:band/:track/:beerName/:userId", pairLikesController.upVote);

};
