const db = require("../models");

module.exports = {
  findPair: function(req, res){
    db.PairLike.countDocuments({
      beerName: req.params.beerName,
      trackName: req.params.track,
      bandName: req.params.band
    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
    });
  },
  findIfUserLiked: function(req, res){
    db.PairLike.findOne({
      beerName: req.params.beerName,
      trackName: req.params.track,
      bandName: req.params.band,
      userId: req.params.userId
    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
    });
  },
  upVote: function(req, res){
    console.log(req.params);
    db.PairLike.create({
      userId: req.params.userId,
      beerName: req.params.beerName,
      trackName: req.params.track,
      bandName: req.params.band,

    }).then((response) => {
      res.json(response);
    }).catch((err) => {
      console.log(err);
    });
  }
};
