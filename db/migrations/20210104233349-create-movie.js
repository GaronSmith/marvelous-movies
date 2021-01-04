'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING(50),
         allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
         allowNull: false,
      },
      releaseDate: {
        type: Sequelize.DATE,
         allowNull: false,
      },
      description: {
        type: Sequelize.TEXT(255),
         allowNull: false,
      },
      imgPath: {
        type: Sequelize.STRING,
         allowNull: false,
      },
      voteRating: {
        type: Sequelize.FLOAT(2,1),
         allowNull: false,
      },
      voteCount: {
        type: Sequelize.INTEGER,
         allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};