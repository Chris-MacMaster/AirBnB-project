// backend/routes/api/session.js


const express = require('express');
// const { where } = require('sequelize');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');





const router = express.Router();

// router.get('/current', async (req, res) => {
//     const userReviews = await Spot.findAll({
//         include: [{model}]
//     })
// })




module.exports = router;



