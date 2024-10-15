const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');
const { isAuthorized } = require('../middleware/authMiddleware');

router.post('/post/session', isAuthorized, controller.post_session);
router.put('/update/session', isAuthorized ,controller.update_session);
router.delete('/delte/session', isAuthorized ,controller.delete_session);
router.post('/approve/session', isAuthorized, controller.approve_session);

module.exports = router;