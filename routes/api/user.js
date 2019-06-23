//need app here somewhere
var userController = require("../../controllers/userController");


module.exports = (app) => {
  app.post("/api/login", userController.createUser);
};
