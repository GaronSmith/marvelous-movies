'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: userId });
  };
  return Review;
};