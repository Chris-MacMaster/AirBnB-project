// backend/routes/api/session.js

const express = require('express');
// const { UPSERT } = require('sequelize/types/query-types');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');


const { Spot, sequelize } = require('../../db/models');
const { SpotImage, Review, User } = require('../../db/models');

// const spotimage = require('../../db/models/spotimage');

const router = express.Router();

const {Op} = require("sequelize")//got the query validations to work 



//edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const target = await Spot.findByPk(req.params.spotId)
    if (!target){
        // res.status(404)
        throw new Error("No spot with provided id exists")
    }
    if (req.user.id !== target.ownerId){
        throw new Error("Each spot can only be edited by owner")
    }

    await target.update({
        ...req.body
    })
    res.json(target)
})



//returns all spots
router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const where = {
        price: {[Op.between]: [minPrice - 1 || 0, maxPrice + 1 || 99999999]},
        lat: { [Op.between]: [minLat - 1 || -99999, maxLat + 1 || 999999] },
        lng: { [Op.between]: [minLng - 1 || -99999, maxLng + 1 || 999999] },
    }
    // function invalidChar()
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


    // where.lat = { min: minLat, max: maxLat }
    // where.lng = { min: minLng, max: maxLng }
    // where.price = { min: minPrice, max: maxPrice }
    
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
        include: [
            { model: SpotImage, as: "previewImage" }
        ],
        where, 
        ...paging})//STOP HERE, proper

    res.status(200)
    res.json({spots, pagifier,

    })

})




//Create a new spot
router.post('/', requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name,
    description,
    price
    } = req.body

    let newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    // await newSpot.validate()
    
    res.status(201)
    res.json(newSpot)
})



// router.get('/current', async (req, res) => {
//     const spots = await Spot.findAll()

//     res.status(200)
//     res.json(spots)

// })

router.get('/:spotId', async (req, res) => {

    let reviews = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [{ model: SpotImage }, { model: User,
        foreignKey: 'ownerId',
        as: "Owner"
        }], 
    })

    spot.numReviews = reviews

    res.json(spot)
})



router.get('/:spotId/reviews', async (req, res) => {

    let reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    res.json(reviews)
})

module.exports = router;


//J65y47FP-szdsaTnvwYa-qoOaUty9lfzokWk; _csrf=Te8mRjfOV4mkCzxbI72lpbFt
// http://localhost:8000/api/spots
