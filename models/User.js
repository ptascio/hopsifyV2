var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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

var User = mongoose.model("User", userSchema);

module.exports = User;

User.create({ email: 'email', password: "password", username: "frank" }, function (err, small) {
  if (err) return (err);
  console.log("saved");
});
