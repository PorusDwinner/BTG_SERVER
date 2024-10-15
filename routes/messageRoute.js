const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');
const { isAuthorized } = require('../middleware/authMiddleware');

router.post('/post/msg', isAuthorized ,controller.send_msg);
router.post('/post/mark/msg', isAuthorized ,controller.mark_read);
router.get('/get/msg', isAuthorized ,controller.get_msg);
router.delete('/delete/msg', isAuthorized ,controller.delete_msg);
router.put('/put/msg', isAuthorized ,controller.update_msg);

module.exports = router;