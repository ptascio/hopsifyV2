const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var password = "password";
var parsedHash;


module.exports = {
  loginUser: function(req, res) {
    db.User.findOne({email: req.body.email})
    .then((user) => {
      if(user){
        user.comparePassword(req.body.password, function(nope, yup){
            if(nope){
              console.log(nope);
              res.json("Something went wrong...");
            }else{
              console.log(yup);
              res.json({email: user.email, _id: user._id, username: user.username});
            }
        });
      }else{
        return res.status(400);
      }

    }).catch((err) => {
      console.log("err: " + err);
    });
  },
  createUser: function(req, res) {
    db.User.findOne({email: req.body.email})
    .then((user) => {
      if(user === null){
        console.log("save this one");
        var newUser = new db.User({
          email: req.body.email,
          password: req.body.password
        });
        newUser.save().then(() => {
          db.User.findOne({email: req.body.email}).then((latestUser) => {
            //send to front end
            console.log(latestUser);
          });
        }).catch((err) => {
          console.log(err.message);
        });
      }else{
        res.json("Email account already exists");
      }

    })
    .catch((err) => {
      console.log("err: " + err);
    });
  },
  fetchUser: function(req, res){
    db.User.findOne({
      _id: req.params.id
    }).then((user) => {
      res.json({
        email: user.email,
        userName: user.username
      });
    }).catch((err) => {
      res.json(err);
    });
  },
  editProfileName: function(req, res) {
    db.User.findOneAndUpdate({_id: req.params.id},
    {username: req.params.newUserName},
    {new: true}).then((user) => {
      res.json({userName: user.username});
      }).catch((err) => {
        res.json(err);
      });
  }
};
