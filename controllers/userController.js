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
            }else{
              console.log(yup);
              console.log(user);
              res.json({email: user.email, _id: user._id});
            }
        });
      }

    }).catch((err) => {
      console.log("err: " + err);
    });
  },
  createUser: function(req, res) {

  }
};
