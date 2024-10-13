const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.post('/signup',auth.signup_post);
router.post('/login',auth.login_post);
router.get('/signup',auth.signup_get);
router.get('/login',auth.login_get);

module.exports = router;