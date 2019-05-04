module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    picks: DataTypes.TEXT
  });
  return User;
};
