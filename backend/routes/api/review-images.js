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



//delete a reviewImage
router.delete('/:imageId', requireAuth, async (req, res) => {

    let reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImage) {
        let err = new Error('No review image found with that id')
        err.status = 404
        throw err
    }

    let review = await Review.findByPk(reviewImage.reviewId)

    if (req.user.id !== review.userId) {
        throw new Error('Only review owner may delete thier review image')
    }

    reviewImage.destroy()

    res.json({
        message: "Review image deleted",
        statusCode: 200
    })

})




module.exports = router;
