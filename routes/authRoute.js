const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.post('/signup',auth.signup_post);
router.post('/login',auth.login_post);
router.delete('/delete/user',auth.delete_user);

module.exports = router;