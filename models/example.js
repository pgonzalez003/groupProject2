module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    picks: DataTypes.TEXT,
    gameID: DataTypes.STRING,
    wager: DataTypes.INTEGER
  });
  return User;
};
