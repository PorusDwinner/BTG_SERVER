const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();

router.post('/signup',controller.signup_post);
router.post('/login',controller.login_post);
router.delete('/delete/user',controller.delete_user);
router.get('/logout',controller.logout_user);

module.exports = router;