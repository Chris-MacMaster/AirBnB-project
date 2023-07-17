// backend/routes/api/session.js

const express = require('express');
// const { UPSERT } = require('sequelize/types/query-types');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, sequelize } = require('../../db/models');
const { SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize")//got the query validations to work 


//returns all spots
router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const where = {
        price: { [Op.between]: [minPrice - 1 || 0, maxPrice + 1 || 99999999] },
        lat: { [Op.between]: [minLat - 1 || -99999, maxLat + 1 || 999999] },
        lng: { [Op.between]: [minLng - 1 || -99999, maxLng + 1 || 999999] },
    }

    if (
        (page && !parseInt(page)) ||
        (size && !parseInt(size)) ||
        (minLat && !parseInt(minLat)) ||
        (maxLat && !parseInt(maxLat)) ||
        (minLng && !parseInt(minLng)) ||
        (maxLng && !parseInt(maxLng)) ||
        (minPrice && !parseInt(minPrice)) ||
        (maxPrice && !parseInt(maxPrice))
    ) {
        res.status(400)
        throw new Error('invalid spot search parameters')
    }

    const pagination = {}

    if (!page || parseInt(page) <= 0) {
        pagination.page = 1
    } else if (page && parseInt(page) >= 1) {
        pagination.page = parseInt(page)
    }

    if (!size || parseInt(size) <= 0) {
        pagination.size = 2
    } else if (size && parseInt(size) >= 1) {
        pagination.size = parseInt(size)
    }
    const paging = {}

    paging.limit = pagination.size
    paging.offset = pagination.size * (pagination.page - 1)

    const pagifier = {}
    pagifier.page = pagination.page


    const spots = await Spot.findAll({
        where//, ...paging
    })//temporaril shut off paging 

    if (!spots.length) {
        let err = new Error("No spots found matching those parameters")
        err.status = 404
        throw err
    }


    function sumArray(arr) {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            obj = arr[i]
            sum += obj.stars
        }
        return sum
    };

    let spotsArr = []


    for (let i = 0; i < spots.length; i++) {
        // let spot = spots[i]
        let spotImage = await SpotImage.findAll(
            {
                attributes: ['url'],
                where: {
                    spotId: spots[i].id
                }
            }
        )
        let spotReviews = await Review.findAll(
            {
                attributes: ['stars'],
                where: {
                    spotId: spots[i].id
                }
            }
        )
        console.log(spotReviews)
        let newSpot = spots[i].toJSON()

        let count = 0;
        let sum = 0;

        if (spotReviews.length) {
            count = spotReviews.length
            sum = sumArray(spotReviews)
            newSpot.avgRating = sum / count
        } else { newSpot.avgRating = "no reviews exist for this spot yet" }

        if (spotImage.length) {
            newSpot.previewImage = spotImage[0].url
        } else { newSpot.previewImage = "no preview image exists for this spot yet" }


        spotsArr.push(newSpot)
    }

    res.status(200)

    let Spots = spotsArr

    res.json({ Spots, ...pagifier })
})

module.exports = router;