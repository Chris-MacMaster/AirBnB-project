// backend/routes/api/index.js
const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./review.js');
const bookingRouter = require('./booking.js')


const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser)

// GET /api/require-auth //TESTING
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

//TESTING
// router.get(
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewRouter)

router.use('/bookings', bookingRouter)

router.use('/review-images', reviewRouter)

router.use('/spot-images', spotsRouter)




router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


module.exports = router;
