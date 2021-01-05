'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    genre: DataTypes.STRING,
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    imgPath: DataTypes.STRING,
    voteRating: DataTypes.FLOAT,
    voteCount: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    const columnMapping = {
      foreignKey: "movieId",
      otherKey: "userId",
      through: "BlockbusterShelf",
    };
  Movie.belongsToMany(models.User, columnMapping);
  Movie.hasMany(models.Review, { foreignKey: "movieId"});
  Movie.hasMany(models.BlockbusterShelf, { foreignKey: "movieId" });
  
};
  return Movie;
};