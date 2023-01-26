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
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "url1",
        preview: true
      },

      {
        spotId: 2,
        url: "url2",
        preview: true
      },

      {
        spotId: 3,
        url: "url3",
        preview: false
      },

    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['url1', 'url2', 'url3'] }
    }, {});
  }
};
