module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    // picks: DataTypes.TEXT,
    // gameID: DataTypes.INTEGER,
    // wager: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.Games, {
      onDelete: "cascade"
    });
  };
  return User;
};
