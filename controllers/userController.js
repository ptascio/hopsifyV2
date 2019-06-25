const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var password = "password";
var parsedHash;


function checkPassword(submittedPassword, dbHash){
  return bcrypt.compare(submittedPassword, dbHash);
}

function hashPassword(submittedPassword){
  return bcrypt.hash(submittedPassword, saltRounds);
}

function checkForEmail(email){
  db.User.findOne({email: email}).then((user) => {
    return user;
  }).catch((err) => {
    return err;
  });
}

function checkForUsername(username, cb){
  db.User.findOne({username: "frank"}).then((user) => {
    if(user){
      cb("name exists");
    }else{cb("good to go");}
  }).catch((err) => {
    return "err";
  });
}

module.exports = {
  findUser: function(req, res) {
    console.log("in here");
    db.User.findOne({email: req.body.email})
    .then((user) => {
      console.log(user.length === 0);
      if(checkPassword("password", user.password)){
        console.log("inside function: " + user);
        //res.json(user);
      }else{
        console.log("Login failed. Incorrect email and/or password.");
        //res.json("Login failed. Incorrect email and/or password.");
      }

    }).catch((err) => {
      console.log("err: " + err);
    });
    console.log("down here");
  },
  createUser: function(req, res) {

  }
};
