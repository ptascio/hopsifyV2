require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

require("./controllers/trackController.js")(app);


app.listen(port, () => {
  console.log("listening");
});
