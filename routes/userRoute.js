const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.get('/get/profile', isAuthorized, controller.get_dp);
router.put('/update/profile', isAuthorized, controller.update_profile);
router.put('/update/dp', isAuthorized, controller.update_dp);
router.post('/post/dp', isAuthorized, controller.post_dp);

module.exports = router;