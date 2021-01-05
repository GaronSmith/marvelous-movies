'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlockbusterShelf = sequelize.define('BlockbusterShelf', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  BlockbusterShelf.associate = function(models) {
   BlockbusterShelf.belongsTo(models.User, { foreignKey: 'userId' });
   BlockbusterShelf.belongsTo(models.Movie, { foreignKey: "movieId" });
   
  };
  
  return BlockbusterShelf;
};