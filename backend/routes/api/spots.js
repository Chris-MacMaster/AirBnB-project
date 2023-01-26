// backend/routes/api/session.js



const express = require('express');
// const { UPSERT } = require('sequelize/types/query-types');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');


const { Spot, sequelize } = require('../../db/models');
const { SpotImage, Review, User } = require('../../db/models');

// const spotimage = require('../../db/models/spotimage');




const router = express.Router();

//returns all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    res.status(200)
    res.json(spots)

})



const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid address.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


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
