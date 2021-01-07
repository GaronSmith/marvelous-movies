'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = []
    const demoUser = {
      userName: "Demo User",
      firstName: "Demo",
      lastName: "User",
      email: "demouser@demoUser.com",
      hashedPassword: await bcrypt.hash("demoUser123", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(demoUser)
    for (let i = 0; i < 50; i++) {
      const newUser = {
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        hashedPassword: await bcrypt.hash(`Password${i}`, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.push(newUser)

    }
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};