const axios = require("axios");
const path = require("path");
const punkBeerUrl = "https://api.punkapi.com/v2/beers/";

const axiosBeer = {
  fetchRandomBeer: () => {
    return axios({
      url: punkBeerUrl+"random",
      method: "get"
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  },

  fetchByABV: (num1, num2) => {
    return axios({
      url: punkBeerUrl+`?abv_gt=${num1}&abv_lt=${num2}&per_page=1`,
      method: "get"
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
};


module.exports = axiosBeer;
