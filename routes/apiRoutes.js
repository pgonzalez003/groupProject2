var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/games", function(req, res) {
    axios
      .get(
        "https://api.the-odds-api.com/v3/odds/?sport=basketball_nba&region=us&mkt=h2h&apiKey=5ea683ff9b10b94e917fea8a4d0e99fe"
      )
      .then(function(response) {
        res.json(
          response.data.data.map(item => {
            return response.data;
          })
        );
      });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
