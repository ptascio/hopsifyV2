//energetic tracks feel fast, loud, and noisy

//A value of 0.0 is least danceable and
//1.0 is most danceable.

//The overall loudness of a track in decibels (dB).
//Values typical range between -60 and 0 db.

//valence	float	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
//Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric),
//while tracks with low valence sound more negative (e.g. sad, depressed, angry).

//avg tempo is 116
//150bpm is fast
const pairBeer = {
  findBeer: (musicObject) => {
    var analysisAVG = 0;
    musicObject.valence = bumpUpNumbers(musicObject.valence);
    musicObject.energy = bumpUpNumbers(musicObject.energy);
    musicObject.danceability = bumpUpNumbers(musicObject.danceability);
    analysisAVG+=musicObject.valence;
    analysisAVG+=musicObject.energy;
    analysisAVG+=musicObject.danceability;
    analysisAVG+=musicObject.tempo;
    analysisAVG+=musicObject.loudness;
    analysisAVG = analysisAVG/5;

    return Math.round(analysisAVG/10);
  }
};

function bumpUpNumbers(num){
   num*= 100;
   return num;
}

module.exports = pairBeer;
