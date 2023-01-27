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
        include: [ { model: User ,
        attributes: 
            ['firstName', 'lastName']
        },
        { model: Spot,
            attributes: { exclude: ['createdAt', 'updatedAt', 'description']}
        
        },
        // { model: SpotImage,
        // attributes: ['url'] },
        { model: ReviewImage,
            attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] }
        }
    ],
    })

    let newReviews = []
    userReviews.forEach(review => {
        review = review.toJSON()
        newReviews.push(review)
    })

    for (let i = 0; i < newReviews.length; i++){
        let review = newReviews[i]

        let image = await SpotImage.findByPk(review.spotId)

        review.Spot.previewImage = image.url

        newReviews[i] = review
    }

    res.json({ newReviews })
})


router.post('/:reviewId/images', requireAuth, async(req, res) => {
    
    


    let newImage = await ReviewImage.create( {
        reviewId: req.params.reviewId,
        ...req.body
    })



    res.json(newImage)


})




module.exports = router;



