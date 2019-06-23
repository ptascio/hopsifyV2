const db = require("../models");

module.exports = {
  findUser: function(req, res) {
    db.User.find(req.query.email).then((user) => {
      console.log(user);
    }).catch((err) => {
      res.json(err);
    });
  }
};
