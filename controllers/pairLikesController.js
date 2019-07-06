const db = require("../models");

module.exports = {
  findPair: function(req, res){
    console.log(req.params);
    db.PairLike.countDocuments({
      beerName: req.params.beerName,
      trackName: req.params.trackName,
      bandName: req.params.bandName
    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
    });
  },
  findIfUserLiked: function(req, res){
    console.log(req.params);
    db.PairLike.findOne({
      beerName: req.params.beerName,
      trackName: req.params.trackName,
      bandName: req.params.bandName,
      userId: req.params.userId
    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
    });
  }
};
