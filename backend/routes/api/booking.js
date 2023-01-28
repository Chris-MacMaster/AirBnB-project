// backend/routes/api/booking.js


const express = require('express');
// const { where } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
const { Review, User, Booking, Spot, SpotImage } = require('../../db/models');
const spot = require('../../db/models/spot');
// const { User } = require('../../db/models');

// const { setTokenCookie, restoreUser } = require('../../utils');





const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    if (!bookings) {
        let err = new Error('User does not have any bookings')
        err.status = 404
        throw err
    }

    let newBookings = []
    bookings.forEach(booking => {
        booking = booking.toJSON()
        newBookings.push(booking)
    })

    for (let i = 0; i < newBookings.length; i++){
        let booking = newBookings[i]

        let bookingSpotData = await Spot.findByPk(booking.spotId,
            {
                // attributes: {
                //     exclude: [['createdAt', 'updatedAt']]
                // }
            })

        bookingSpotData = bookingSpotData.toJSON()

        booking.Spot = {
            ...bookingSpotData
        }

        delete booking.Spot.createdAt
        delete booking.Spot.updatedAt
        delete booking.Spot.description

        let previewImage = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: booking.id
            }

        })

        if (previewImage) {
            booking.Spot.previewImage = previewImage.url
        } else {
            booking.Spot.previewImage = "No preview found"
        }

    }

    res.status(200) 
    // console.log('triggered get route')
    res.json({ newBookings })
})



router.post('/', async (req, res) => {


    const { spotId, userId, startDate, endDate } = req.body


    let bookedDays = []

    let bookings = await Booking.findAll({
        attributes: ['startDate', 'endDate'],
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



//fetch returns a promise that resolves to a response object 

module.exports = router;



