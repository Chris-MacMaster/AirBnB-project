'use strict';


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'demo@user.io',
        reviewId: 1
      },
      {
        url: 'user1@user.io',
        reviewId: 2
      },
      {
        url: "seededuser@user.io",
        reviewId: 3
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['demo@user.io', 'user1@user.io', 'seededuser@user.io'] }
    }, {});
  }
};
