

const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const password = "password";
var parsedHash;


function checkPassword(submittedPassword, dbHash){
  bcrypt.compare(submittedPassword, dbHash, function(err, response) {
    if(err){
      return err;
    }
    return response;
  });
}

function hashPassword(submittedPassword){
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err){
      return;
    }
    return hash;
  });
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
    db.User.find({email: req.body.email})
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
    db.User.create({
      email: "email",
      username: "frank",
      password: "12345"
    }).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log("err: " + err);
    });











  }
};
