const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.get('/get/profile', isAuthorized, controller.get_dp);
router.put('/update/profile', isAuthorized, controller.update_profile);

module.exports = router;