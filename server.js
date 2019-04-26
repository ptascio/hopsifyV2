require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./controllers/trackController.js")(app);


app.listen(port, () => {
  console.log("listening");
});
