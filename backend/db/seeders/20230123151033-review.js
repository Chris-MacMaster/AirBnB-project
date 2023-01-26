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
        spotId: 1,
        userId: 1,
        review: "good",
        stars: 1,
      },

      {
        spotId: 2,
        userId: 2,
        review: "goood",
        stars: 2,
      },

      {
        spotId: 3,
        userId: 3,
        review: "goooood",
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
      review: { [Op.in]: ['good', 'goood', 'goooood'] }
    }, {});
  }
};
