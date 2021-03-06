'use strict';

const { User, Movie } = require('../models')
const { Op } = require('sequelize');

module.exports = {
  up: async(queryInterface, Sequelize) => {
    
    function randomNum(max) {
      return Math.ceil(Math.random() * Math.floor(max));
    };

    const users = await User.count({ where: { id: { [Op.gt]: 0 } } });
    const followers = []

    for(let i = 2; i < 32; i++ ){
      const demo = 1
      const demoFollows = {
        userId: demo,
        followId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      followers.push(demoFollows)
    }
    for (let j = 2; j < 20; j++) {
      let follower = randomNum(users)
      if(follower !== j){
        const follows = {
          userId: j,
          followId: follower,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        followers.push(follows)
      }
  
    }
    
      return queryInterface.bulkInsert('Follows', followers, {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Follows', null, {});
  
  }
};
