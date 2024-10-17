const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();

router.post('/signup',controller.signup_post);
router.post('/login',controller.login_post);
router.delete('/delete/user',controller.delete_user);
router.get('/logout',controller.logout_user);
router.get('/forgot',controller.forgot_password_get);
router.post('/forgot',controller.forgot_password_post);

module.exports = router;