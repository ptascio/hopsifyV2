require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var db = require("./models");
const app = express();


const port = process.env.PORT || 3001;

// const staticFiles = express.static(path.join(__dirname, 'client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}else {
  app.use(express.static(path.join(__dirname, 'client/public')));
}
// app.get('*', (req, res) => {
//
//   res.sendFile(path.join('index.html'));
// });

console.log(path.join(__dirname+'/client/public/index.html'));


require("./controllers/trackController.js")(app);

db.sequelize.sync().then(function(){
  app.listen(port, () => {
    console.log("listening");
  });
});
