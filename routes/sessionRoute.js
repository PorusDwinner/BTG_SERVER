const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');

router.post('/post/session',controller.book_session);
router.put('/update/session',controller.update_session);
router.delete('/delete/session',controller.delete_session);

module.exports = router;