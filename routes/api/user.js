//need app here somewhere
var userController = require("../../controllers/userController");


module.exports = (app) => {
  app.post("/api/login", userController.loginUser);
  app.post("/api/create-account", userController.createUser);
  app.get("/api/fetch-user/:id", userController.fetchUser);
  app.patch("/api/changeName/:id/:newUserName", userController.editProfileName);
};
