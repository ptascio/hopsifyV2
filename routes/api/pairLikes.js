var pairLikesController = require("../../controllers/pairLikesController");

module.exports = (app) => {
  app.get("/api/findPairs/:band/:track/:beerName", pairLikesController.findPair);
  app.get("/api/findIfUserLiked/:band/:track/:beerName/:userId", pairLikesController.findIfUserLiked);
  app.get("/api/userPairs/:userId", pairLikesController.findUserLikes);
  app.post("/api/upVote/:band/:track/:beerName/:userId", pairLikesController.upVote);
  app.delete("/api/downVote/:band/:track/:beerName/:userId", pairLikesController.downVote);
  app.delete("/api/removePair/:id", pairLikesController.deletePair);

};
