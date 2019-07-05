var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var pairLikeSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  beerName: {
    type: String,
    required: true
  },
  trackName: {
    type: String,
    required: true
  },
  bandName: {
    type: String,
    required: true
  }
}, {timestamps: true});

var PairLike = mongoose.model("PairLike", pairLikeSchema);
module.exports = PairLike;
