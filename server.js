require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var db = require("./models");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

// const staticFiles = express.static(path.join(__dirname, 'client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}else {
  console.log("not in production");
  app.use(express.static(path.join(__dirname, 'client/public')));
}
// app.get('*', (req, res) => {
//
//   res.sendFile(path.join('index.html'));
// });

require("./controllers/trackController.js")(app);
require("./routes/api/user")(app);
require("./routes/api/pairLikes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hopsifyDB";

mongoose.connect(MONGODB_URI);

app.listen(port, () => {
  console.log("listening");
});
