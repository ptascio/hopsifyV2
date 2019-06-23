const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const password = "password";
var parsedHash;

module.exports = {
  findUser: function(req, res) {
    console.log(req.body);
    db.User.find({email: req.body.email})
    .select({"email": 1, "username": 1}).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
  },
  createUser: function(req, res) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      parsedHash = hash;
    });
  },
  checkPassword: function(userpassword) {
    bcrypt.compare(userpassword, parsedHash, function(err, response) {
      if(err){
        console.log("err: " + err);
      }
      console.log("success: " + response);
    });
  }
};
