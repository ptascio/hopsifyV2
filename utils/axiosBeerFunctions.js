const axios = require("axios");
const path = require("path");
const punkBeerUrl = "https://api.punkapi.com/v2/beers/";
const breweryDB = "https://sandbox-api.brewerydb.com/v2/beer/";
let config = {"Authorization": process.env.REACT_APP_BREW};
const axiosBeer = {
  fetchRandomBeer: (abv, abv2) => {
    return axios({
      url: breweryDB + `random?abv=${abv},${abv2}`,
      method: "get",
      headers: config
    }).then((res) => {
      var beerId = res.data.data.id;
      fetchDetailsOfRandomBeer(beerId);
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

function fetchDetailsOfRandomBeer(id) {
  return axios({
    url: breweryDB + id,
    method: "get",
    headers: config
  }).then((res) => {
    res.send(res.data.data);

  }).catch((err) => {
    console.log(err);
  });
}

module.exports = axiosBeer;
