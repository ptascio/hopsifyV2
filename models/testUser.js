var mongoose = require("mongoose");
var User = require("./User");

var connStr = "mongodb://localhost/hopsifyDB";
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
});

// create a user a new user
var testUser = new User({
    email: "email4",
    password: "123456"
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
User.findOne({ email: 'email4' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('123456', function(err, isMatch) {
        if (err) throw err;
        console.log('123456:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('12345', function(err, isMatch) {
        if (err) throw err;
        console.log('12345:', isMatch); // -> 123Password: false
    });
});
});
