const axios = require("axios");

const axiosReq =  {
    fetchAll: () => {axios.get("https://www.google.com/")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {

    });
  }
};

module.exports = axiosReq;
