module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    gameID: {
      type: DataTypes.STRING(100),
      defaultValue: DataTypes.STRING,
      primaryKey: true
    },
    homeTeam: DataTypes.TEXT,
    awayTeam: DataTypes.TEXT,
    homeOdds: DataTypes.INTEGER,
    awayOdds: DataTypes.INTEGER
  });
  Games.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Games.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Games;
};
