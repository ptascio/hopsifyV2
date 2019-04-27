require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();


const port = process.env.PORT || 3001;

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles));

require("./controllers/trackController.js")(app);


app.listen(port, () => {
  console.log("listening");
});
