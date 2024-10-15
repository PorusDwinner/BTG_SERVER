const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');

router.post('/post/session',controller.post_session);
router.put('/update/session',controller.update_session);
router.delete('/delte/session',controller.delete_session);

module.exports = router;