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
        axios.fetchTrackByNameAndArtist(artist, track, spotifyToken)
        .then((response) => {
          trackId = response.items[0].id;
          musicObject.artistId = response.items[0].artists[0].id;
          musicObject.songTitle = response.items[0].name;
          musicObject.previewUrl = response.items[0].preview_url;
          musicObject.albumImg = response.items[0].album.images[1].url;
          checkDB(trackId).then((result) => {
            // res.json(musicObject);
            if(!result){
              makeFeaturesCall().then(()=> {
                res.json(musicObject);
              });
            }else{
              res.json(musicObject);
            }
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
    }else if(spotifyToken && track){
      axios.fetchArtistOrTrackInfo("track", track, spotifyToken).then((response) => {
        console.log(response.data.tracks.items);
      }).catch((error) => {
        console.log(error);
      });
    }else if(spotifyToken && artist){
      axios.fetchArtistOrTrackInfo("artist", artist, spotifyToken).then((response) => {
        console.log(response.data.artists.items);
      }).catch((error) => {
        console.log("error");
      });
    }
    else{
      res.send("Sorry, something went wrong. Did you fill in both fields?");
    }
  });
};

function checkDB(id){
  return db.TrackInfo.findOne({
    where: {track_id: id}
  }).then((trackInfo) => {

    if(!trackInfo){
      return false;
    }else{
      musicObject.loudness = trackInfo.dataValues.loudness;
      musicObject.tempo = trackInfo.dataValues.tempo;
      musicObject.energy = trackInfo.dataValues.energy;
      musicObject.danceability = trackInfo.dataValues.danceability;
      return true;
    }
  }).catch((err) => {
    console.log("did not find it:"+err);
  });
}

function makeFeaturesCall(){
  return axios.fetchTrackById(spotifyToken, "audio-features", trackId)
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
        console.log(trackInfo);
      }).catch((err) => {
        console.log("sequelize error");
      });
    }).catch((error) => {
      console.log("there was an error here: " + error);
    });
}
