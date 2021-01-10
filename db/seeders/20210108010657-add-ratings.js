'use strict';

const faker = require('faker');
const { User, Movie } = require('../models')
const { Op } = require('sequelize');

module.exports = {
  up: async(queryInterface, Sequelize) => {

    function randomNum(max) {
      return Math.ceil(Math.random() * Math.floor(max));
    };

    const users = await User.count({ where: { id: { [Op.gt]: 0 }}});
  
    const movies = await Movie.count({ where: { id: { [Op.gt]: 0 }}} );

    const reviews = [];

    for(let i = 0; i < 500; i++){
      const newReview = {
        userId: randomNum(users),
        movieId: randomNum(movies),
        rating: randomNum(5),
        comment: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      reviews.push(newReview)
    }
    return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Reviews', null, {});
  
  }
};
