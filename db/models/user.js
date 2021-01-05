'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    const columnMapping = {
      foreignKey:'userId',
      otherKey:'movieId',
      through:'BlockbusterShelf'}
    User.belongsToMany(models.Movie,columnMapping)
    User.hasMany(models.BlockbusterShelf,{foreignKey:'userId'})
    User.hasMany(models.Review, { foreignKey: 'userId' });
  
  User.belongsToMany(models.User,{as: 'Followers',
  foreignKey:'userId',
  otherKey:'followId',
  through:'Follow'
})
  User.belongsToMany(models.User, {
    as: "Followings",
    foreignKey: "followId",
    otherKey: "userId",
    through: "Follow",
  });
  };
  return User;
};