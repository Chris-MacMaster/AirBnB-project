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
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'address1',
        city: "city1",
        state: "state1",
        country: "country1",
        lat: 2.1,
        lng: 2.2,
        name: "name1",
        description: "description1 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 2.3
      },

      {
        ownerId: 2,
        address: 'address2',
        city: "city2",
        state: "state2",
        country: "country2",
        lat: 2.4,
        lng: 2.5,
        name: "name2",
        description: "description2 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 2.9
      },

      {
        ownerId: 3,
        address: 'address3',
        city: "city3",
        state: "state3",
        country: "country3",
        lat: 3.4,
        lng: 3.5,
        name: "name3",
        description: "description3 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 3.9
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['name1', 'name2', 'name3'] }
    }, {});
  }
};
