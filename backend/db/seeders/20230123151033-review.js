'use strict';


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        review: "This is review with spotID 2, userID 1",
        stars: 1,
      },

      {
        spotId: 3,
        userId: 2,
        review: "This is review with spotID 3, userID 2",
        stars: 2,
      },

      {
        spotId: 1,
        userId: 3,
        review: "This is review with spotID 1, userID 3",
        stars: 3,
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['This is review with spotID 2, userID 1', 'This is review with spotID 3, userID 2', 'This is review with spotID 1, userID 3'] }
    }, {});
  }
};
