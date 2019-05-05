var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    axios
      .get("https://api.the-odds-api.com/v3/odds/?sport=baseball_mlb&region=us&mkt=h2h&apiKey=968ebf4314e248c0b7903d03b1ff6c2b")
      .then(function(response) {
        res.json(response.data);
      });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
