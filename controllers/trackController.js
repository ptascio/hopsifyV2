const axios = require("../utils/axiosFunctions");
const pairBeer = require("../utils/beerPairingFunctions");
const beerCalls = require("../utils/axiosBeerFunctions");
var spotifyToken;
var db = require("../models");
var trackId;
var artistId;
var previewUrl;
var abvPair;
var musicObject = {};

module.exports = (app) => {
  axios.fetchToken().then((token) => {
    spotifyToken = token;
  });

  app.get("/api/track", (req, res) => {
    console.log("in get request");

    var artist = req.query.artistName;
    var track = req.query.trackName;
    artist = artist.toLowerCase();
    track = track.toLowerCase();
    if(spotifyToken && artist && track){
      db.TrackSearch.create({
        trackName: track,
        artistName: artist
      }).then(() => {
        axios.fetchTrackByNameAndArtist(artist, track, spotifyToken)
        .then((response) => {
          if(response.items.length > 0){
          trackId = response.items[0].id;
          musicObject.artistId = response.items[0].artists[0].id;
          musicObject.songTitle = response.items[0].name;
          musicObject.previewUrl = response.items[0].preview_url;
          musicObject.albumImg = response.items[0].album.images[1].url;
          checkDB(trackId).then((result) => {
            if(!result){
              makeFeaturesCall().then(()=> {
                res.json(musicObject);
              });
            }else{
              res.json(musicObject);
            }
          });
          }else{
            res.send("Sorry, something went wrong.");
          }
        }).catch((error) => {
          console.log("there was an error here: " + error);
        });
      });
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
      res.send("Sorry, something went wrong.");
    }
  });

  app.get("/api/beer", (req, res) => {
    console.log(req.query);
    beerCalls.fetchRandomBeer(req.query.abv, req.query.abv2).then((r) => {
      console.log(r);
      res.send(r.data.data);
    }).catch((err) => {
      res.send(err);
    });
  });
};

function checkDB(id){
  return db.TrackInfo.findOne({
    trackId: id
  }).then((trackInfo
  ) => {

    if(!trackInfo){
      console.log("did not find track info");
      return false;
    }else{
      musicObject.loudness = trackInfo.dataValues.loudness;
      musicObject.tempo = trackInfo.dataValues.tempo;
      musicObject.energy = trackInfo.dataValues.energy;
      musicObject.danceability = trackInfo.dataValues.danceability;
      musicObject.valence = trackInfo.dataValues.valence;
      musicObject.abvPair = trackInfo.dataValues.abvPair;
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
      musicObject.valence = features.valence;
      abvPair = pairBeer.findBeer(musicObject);
      musicObject.abvPair = abvPair;
      db.TrackInfo.create({
        trackId: trackId,
        loudness: features.loudness,
        tempo: features.tempo,
        energy: features.energy,
        danceability: features.danceability,
        valence: features.valence,
        abvPair: abvPair
      }).then((trackInfo) => {
        console.log(trackInfo);
      }).catch((err) => {
        console.log("database error: " + err);
      });
    }).catch((error) => {
      console.log("there was an error here: " + error);
    });


}
