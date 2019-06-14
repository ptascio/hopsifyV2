//energetic tracks feel fast, loud, and noisy
//A value of 0.0 is least danceable and 1.0 is most danceable.
//The overall loudness of a track in decibels (dB).
//Values typical range between -60 and 0 db.
//valence	float	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
const pairBeer = {
  findBeer: (musicObject) => {
    console.log(musicObject.valence);
    console.log(musicObject.loudness);
    console.log(musicObject.tempo);
    console.log(musicObject.energy);
    console.log(musicObject.danceability);
  }
};

module.exports = pairBeer;
