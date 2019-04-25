require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Vue = require("vue");
const vm = new Vue({});
console.log(vm);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./controllers/trackController.js")(app);


app.listen(port, () => {
  console.log("listening");
});
