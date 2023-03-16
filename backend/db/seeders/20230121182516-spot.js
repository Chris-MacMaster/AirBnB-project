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
        lat: 12,
        lng: -122,
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
        lat: 12,
        lng: -122,
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
        lat: 12,
        lng: -122,
        name: "name3",
        description: "description3 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 3.9
      },

      {
        ownerId: 4,
        address: 'address4',
        city: "city4",
        state: "state4",
        country: "country4",
        lat: 12,
        lng: -122,
        name: "name4",
        description: "description4 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 4.9
      },

      {
        ownerId: 5,
        address: 'address5',
        city: "city5",
        state: "state5",
        country: "country5",
        lat: 12,
        lng: -122,
        name: "name5",
        description: "description5 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 5.9
      },

      {
        ownerId: 6,
        address: 'address6',
        city: "city6",
        state: "state6",
        country: "country6",
        lat: 12,
        lng: -122,
        name: "name6",
        description: "description6 This is seed data as a description. oaspifjdpasjiojafdpq jfopjipjwiwjipeijafj wfpasdjfpsjfpajodpjfopwjfwep wjeopfeowaj fpwiaoa[pf kep[afkeawfe fjafw",
        price: 6.9
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'] }
    }, {});
  }
};
