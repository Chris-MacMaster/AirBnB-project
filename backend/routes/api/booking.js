// backend/routes/api/booking.js


const express = require('express');
// const { where } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
const { Booking, Spot, SpotImage } = require('../../db/models');
// const spot = require('../../db/models/spot');
// const { User } = require('../../db/models');

// const { setTokenCookie, restoreUser } = require('../../utils');





const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    if (!bookings.length) {
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


//            "endDate": "2021-11-20",

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    let originalBooking = booking
    if (!booking) {
        let err = new Error("Booking couldn't be found")
        err.status = 404
        throw err
    }
    if (req.user.id !== booking.userId) {
        throw new Error("Each booking can only be edited by owner")
    }

    jsonBooking = booking.toJSON()
    console.log(jsonBooking.endDate)

    let now = Date.now()

    if (endB4Start(now, jsonBooking.endDate)){
        let err = new Error('May not edit past or past bookings')
        err.status = 400
        throw err
    }

    if (endB4Start(req.body.startDate, req.body.endDate)){
        let err = new Error('endDate cannot come before startDate')
        err.status = 400
        throw err
    }

    let bookings = await Booking.findAll({
        where: {
            id: parseInt(req.params.bookingId)
        }
    })

    let newBookings = []

    bookings.forEach(booking => {
        booking = booking.toJSON()
        newBookings.push(booking)
    })


    for (let i = 0; i < newBookings.length; i++) {
        let booking = newBookings[i]

        if (isConflict(booking.startDate, req.body.startDate, booking.endDate)) {
            let err = new Error('Sorry, this spot is already booked for the specified dates. Start date conflicts with an existing booking')
            err.status = 403
            throw err
        }
        if (isConflict(booking.startDate, req.body.endDate, booking.endDate)) {
            let err = new Error('Sorry, this spot is already booked for the specified dates. End date conflicts with an existing booking')
            err.status = 403
            throw err
        }
    }

    function endB4Start(startDate, endDate) {
        let startObj = new Date(startDate)
        let endObj = new Date(endDate)

        if (endObj >= startObj) {
            return false
        }
        return true
    }

    function isConflict(dateStr1, dateStr2, dateStr3) {
        let dateObj1 = new Date(dateStr1)
        let dateObj2 = new Date(dateStr2)
        let dateObj3 = new Date(dateStr3)

        if (dateObj1 <= dateObj2 && dateObj2 <= dateObj3) {
            return true
        }
        return false
    }

    await originalBooking.update({
        ...req.body
    })
    res.json(originalBooking)
})



//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {

    let booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        let err = new Error('No booking found with that id')
        err.status = 404
        throw err
    }

    if (req.user.id !== booking.userId) {
        throw new Error('Only owner may delete their booking')
    }

    let now = Date.now()
    jsonBooking = booking.toJSON()

    if (endB4Start(now, jsonBooking.startDate)){
        throw new Error('May not delete current or past bookings')
    }

    function endB4Start(startDate, endDate) {
        let startObj = new Date(startDate)
        let endObj = new Date(endDate)

        if (endObj >= startObj) {
            return false
        }
        return true
    }

    await booking.destroy()

    res.json({
        message: 'Booking deleted',
        statusCode: 200
    })
})



//fetch returns a promise that resolves to a response object 

module.exports = router;



