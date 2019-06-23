const db = require("../models");

module.exports = {
  findUser: function(req, res) {
    console.log(req.body);
    db.User.find({email: req.body.email})
    .select({"email": 1, "username": 1}).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
  }
};
