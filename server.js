require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();


const port = process.env.PORT || 3001;

// const staticFiles = express.static(path.join(__dirname, 'client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname= 'client/build/index.html'));
  });
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

console.log(path.join(__dirname+'/client/public/index.html'));


require("./controllers/trackController.js")(app);


app.listen(port, () => {
  console.log("listening");
});
