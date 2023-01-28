// backend/routes/api/session.js
const express = require('express');
// const { where } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
// const { User } = require('../../db/models');



const router = express.Router();



router.get('/current', requireAuth, async (req, res) => {
    const userReviews = await Review.findAll({
        where:  {userId: req.user.id},
    })

        let newReviews = []
        userReviews.forEach(review => {
            review = review.toJSON()
            newReviews.push(review)
        })


    for (let i = 0; i < newReviews.length; i++){
        let review = newReviews[i]

        // review = review.toJSON()

        let user = await User.findByPk(newReviews[i].userId,
            // {
            //     attributes: [['id'], ['firstName'], ['lastName']]
            // }
            )
        user = user.toJSON()

        delete user.username

        review.User = {
            ...user
        }

        let spot = await Spot.findByPk(newReviews[i].spotId,
            {
                attributes: {
                    exclude: [['createdAt', 'updatedAt']]
                }
            })

        spot = spot.toJSON()

        delete spot.description
        delete spot.createdAt
        delete spot.updatedAt
        
        review.Spot = {
            ...spot
        }

        console.log(spot)

        let previewImage = await SpotImage.findOne({
            where: {
            preview: true,
            spotId: spot.id
            }

        })
        // console.log(previewImage)


        // previewImage = previewImage.toJSON()

        // console.log(previewImage)

        if (previewImage){
            review.Spot.previewImage = previewImage.url
        } else {
            review.Spot.previewImage = "No preview found"
        }

        let reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id', 'url']
        })

        if (reviewImages.length){
            review.ReviewImages = reviewImages
        } else {
            review.ReviewImages = "No review images found"
        }

        let image = await SpotImage.findByPk(review.spotId)

        if (image){
            review.Spot.previewImage = image.url
        } else {
            review.Spot.previewImage = "No spot image found"
        }

        // review.Spot.previewImage = image.url

        newReviews[i] = review
    }

    let Reviews = newReviews

    res.json({ Reviews })
})

//edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const target = await Review.findByPk(req.params.reviewId)
    if (!target) {
        let err = new Error("No review with provided id exists")
        err.status = 404
        throw err
    }
    if (req.user.id !== target.userId) {
        throw new Error("Each review can only be edited by owner")
    }

    await target.update({
        ...req.body
    })
    res.json(target)
})


//create an image for a review based on reviewId
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    let target = await Review.findByPk(req.params.reviewId)


    if (!target) {
        let err = new Error('Review does not exist with provided id')
        err.status = 404
        throw err
    }

    if (req.user.id !== target.userId){
        throw new Error("You must have created the review to add an image to it")
    }

    let count = await ReviewImage.count({
        where: {
            reviewId: target.id
        }
    })

    if (count >= 10){
        let err = new Error('You may not provide more than 10 images to a review.')
        err.status = 400
        throw err
    }


    let newImage = await ReviewImage.create( {
        reviewId: req.params.reviewId,
        ...req.body
    })

    newImage = newImage.toJSON()

    delete newImage.reviewId
    delete newImage.updatedAt
    delete newImage.createdAt

    res.json(newImage)
})







module.exports = router;



