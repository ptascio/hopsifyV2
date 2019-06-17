const axios = require("axios");
const path = require("path");
const punkBeerUrl = "https://api.punkapi.com/v2/beers/";
const breweryDB = "https://sandbox-api.brewerydb.com/v2/beer/random/";
let config = {"Authorization": process.env.REACT_APP_BREW};
const axiosBeer = {
  fetchRandomBeer: () => {
    return axios({
      url: breweryDB,
      method: "get",
      headers: config
    }).then((res) => {
      return res;
    }).catch((error) => {
      return error;
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
