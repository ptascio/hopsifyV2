const axios = require("axios");
const path = require("path");
const punkBeerUrl = "https://api.punkapi.com/v2/beers/";

const axiosBeer = {
  fetchRandomBeer: () => {
    return axios({
      url: punkBeerUrl+"/random",
      method: "get"
    }).then((response) => {

    }).catch((error) => {
      console.log(error);
    });
  }
};

module.exports = axiosBeer;
