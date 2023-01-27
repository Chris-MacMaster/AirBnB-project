// backend/routes/api/booking.js


const express = require('express');
// const { where } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
const { Review, User, Booking } = require('../../db/models');
// const { User } = require('../../db/models');

// const { setTokenCookie, restoreUser } = require('../../utils');





const router = express.Router();


router.get('/', async (req, res) => {
    let bookings = await Booking.findAll()

    res.status(200) 
    // console.log('triggered get route')
    res.json(bookings)
})



router.post('/', async (req, res) => {
    // let bookings = await Booking.findAll()

    // function getDates(start, end,){

    // }

    const { spotId, userId, startDate, endDate } = req.body


    let bookedDays = []

    let bookings = await Booking.findAll({
        attributes: ['startDate', 'endDate']
    })

    // bookings.forEach(booking => {

    // })

    let newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    await newBooking.save()

    res.json(newBooking)

    // res.status(200)
    // res.json(bookings)
})

router.put('/:bookingId', async (req, res) => {

})


// router.get('/current', async (req, res) => {
//     const userReviews = await Spot.findAll({
//         include: [{model}]
//     })
// })

//fetch returns a promise that resolves to a response object 

module.exports = router;



