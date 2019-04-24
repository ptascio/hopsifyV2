require("dotenv").config();
var axios = require("./routes/axiosRoutes");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(port, () => {
  console.log("listening");
});
