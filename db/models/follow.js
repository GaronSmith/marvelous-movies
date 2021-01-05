'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};