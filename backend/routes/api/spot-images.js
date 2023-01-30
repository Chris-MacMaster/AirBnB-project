// backend/routes/api/session.js

const express = require('express');
// const { UPSERT } = require('sequelize/types/query-types');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');


const { Spot, sequelize } = require('../../db/models');
const { SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

// const spotimage = require('../../db/models/spotimage');

const router = express.Router();

const { Op } = require("sequelize")//got the query validations to work 



//delete a spotImage
router.delete('/:imageId', requireAuth, async (req, res) => {

    let spotImage = await SpotImage.findByPk(req.params.imageId)

    if (!spotImage) {
        let err = new Error('No spot image found with that id')
        err.status = 404
        throw err
    }

    let spot = await Spot.findByPk(spotImage.spotId)

    if (req.user.id !== spot.ownerId) {
        throw new Error('Only spot owner may delete thier spot image')
    }

    spotImage.destroy()

    res.json({
        message: "Spot image deleted",
        statusCode: 200
    })
})



module.exports = router;
