const axios = require("./axiosFunctions");
var spotifyToken;
var db = require("../models");
var trackId;
var artistId;
var previewUrl;
var musicObject = {};

module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
  });

  app.get("/api/track", (req, res) => {
    console.log("in get request");
    var artist = req.query.artistName;
    var track = req.query.trackName;
    if(spotifyToken && artist && track){
      // db.TrackSearch.create({
      //   track_name: req.query.trackName,
      //   artist_name: req.query.artistName
      // }).then(() => {
        axios.fetchTrackByName(artist, track, spotifyToken)
        .then((response) => {
          trackId = response.items[0].id;
          musicObject.artistId = response.items[0].artists[0].id;
          musicObject.songTitle = response.items[0].name;
          musicObject.previewUrl = response.items[0].preview_url;
          musicObject.albumImg = response.items[0].album.images[1].url;
          checkDB(trackId).then(() => {
            res.json(musicObject);
          });

            // axios.fetchTrackById(spotifyToken, "audio-features", trackId)
            //   .then((features) => {
            //     musicObject.loudness = features.loudness;
            //     musicObject.tempo = features.tempo;
            //     musicObject.energy = features.energy;
            //     musicObject.danceability = features.danceability;
            //     res.json(musicObject);
            //   });


        }).catch((error) => {
          console.log("there was an error here: " + error);
        });
      // });
    }else{
      res.send("Sorry, something went wrong. Did you fill in both fields?");
    }
  });
};

function checkDB(id){
  return db.TrackInfo.findOne({
    where: {track_id: id}
  }).then((trackInfo) => {
    if(!trackInfo){
      console.log("nulllll");
      onWard();
    }else{
      console.log("already here");
      musicObject.loudness = trackInfo.dataValues.loudness;
      musicObject.tempo = trackInfo.dataValues.tempo;
      musicObject.energy = trackInfo.dataValues.energy;
      musicObject.danceability = trackInfo.dataValues.danceability;
    }
  });
}

function onWard(){
  axios.fetchTrackById(spotifyToken, "audio-features", trackId)
    .then((features) => {
      musicObject.loudness = features.loudness;
      musicObject.tempo = features.tempo;
      musicObject.energy = features.energy;
      musicObject.danceability = features.danceability;
      db.TrackInfo.create({
        track_id: trackId,
        loudness: features.loudness,
        tempo: features.tempo,
        energy: features.energy,
        danceability: features.danceability
      }).then((trackInfo) => {
        console.log("created");
      });
    }).catch((error) => {
      console.log("there was an error here: " + error);
    });
}
