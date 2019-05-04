var db = require("../models");

module.exports = function(app) {
  // Get all user
  app.get("/api/user", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
