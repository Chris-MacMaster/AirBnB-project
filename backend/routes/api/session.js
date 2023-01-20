// backend/routes/api/session.js


const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Log in
router.post('/',
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);


// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);






//5X7jMxJN-m-ZVvwmySIq4Ft7sQrmc2qRBwNQ

// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `5X7jMxJN-m-ZVvwmySIq4Ft7sQrmc2qRBwNQ`
//   }
// }).then(res => res.json()).then(data => console.log(data));



module.exports = router;
