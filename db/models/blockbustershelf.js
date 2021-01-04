'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlockbusterShelf = sequelize.define('BlockbusterShelf', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  BlockbusterShelf.associate = function(models) {
    // associations can be defined here
  };
  return BlockbusterShelf;
};