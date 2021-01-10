'use strict';

const { User, Movie } = require('../models')
const { Op } = require('sequelize');

module.exports = {
  up: async(queryInterface, Sequelize) => {
    
    function randomNum(max) {
      return Math.ceil(Math.random() * Math.floor(max));
    };

    const users = await User.count({ where: { id: { [Op.gt]: 0 } } });

    const movies = await Movie.count({ where: { id: { [Op.gt]: 0 } } });

    const status = [
      "Want to Watch",
      "Currently Watching",
      "Watched"
    ]
    const shelves = []

    for(let i = 0; i < 500; i++ ){
      const newShelf = {
        userId: randomNum(users),
        movieId: randomNum(movies),
        status: status[randomNum(2)],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      shelves.push(newShelf)
    }
     
      return queryInterface.bulkInsert('BlockbusterShelves', shelves, {});
    
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('BlockbusterShelves', null, {});

  }
};
