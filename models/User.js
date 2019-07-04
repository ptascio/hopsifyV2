var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: {
      index: { unique: true}
    }
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  }
});

userSchema.pre("save", function(next) {
  var user = this;

  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(submittedPassword, cb){
  bcrypt.compare(submittedPassword, this.password, function(error, success) {
    if(error) return cb(error);
    cb(null, success);
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
