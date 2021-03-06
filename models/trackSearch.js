var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var trackSearchSchema = new Schema({
  trackName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  userId: {
    type: String
  }
}, {timestamps: true});

var TrackSearch = mongoose.model("TrackSearch", trackSearchSchema);

module.exports = TrackSearch;
