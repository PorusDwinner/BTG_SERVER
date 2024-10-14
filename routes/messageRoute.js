const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.post('/post/msg',controller.send_msg);
router.post('/post/mark/msg',controller.mark_read);
router.get('/get/msg',controller.get_msg);
router.delete('/delete/msg',controller.delete_msg);

module.exports = router;