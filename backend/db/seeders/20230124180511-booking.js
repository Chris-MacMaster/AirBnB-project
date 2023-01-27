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
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },

      {
        spotId: 2,
        userId: 2,
        startDate: "2020-11-19",
        endDate: "2020-11-20"
      },

      {
        spotId: 3,
        userId: 3,
        startDate: "2020-11-21",
        endDate: "2019-11-20"
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2021-11-19', '2020-11-19', '2020-11-21'] }
    }, {});
  }
};



/*
let url = 

let options = {}

options.method = "POST"

options.headers = {
  "Content-Type": "application/json"
}

options.body = {
  spotId: 20,
        userId: 20,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
}






fetch(url, options)

  {
        spotId: 1,
        userId: 1,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },

      {
        spotId: 2,
        userId: 2,
        startDate: "2020-11-19",
        endDate: "2020-11-20"
      },

      {
        spotId: 3,
        userId: 3,
        startDate: "2019-11-19",
        endDate: "2019-11-20"
      },


*/