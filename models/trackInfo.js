var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var trackInfoSchema = new Schema({
  trackId: {
    type: String,
    required: true,
    unique: { index: { unique: true}}
  },
  loudness: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true
  },
  danceability: {
    type: Number,
    required: true
  },
  tempo: {
    type: Number,
    required: true
  },
  valence: {
    type: Number,
    required: true
  },
  abvPair: {
    type: Number
  }
}, {timestamps: true});

var TrackInfo = mongoose.model("TrackInfo", trackInfoSchema);

module.exports = TrackInfo;
