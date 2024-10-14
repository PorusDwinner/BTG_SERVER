require('dotenv').config();
const services = require('../services/messageService');

module.exports.send_msg = async(req, res) => {
    const { sender_id, reciever_id, message } = req.body;
    let params = { sender_id, reciever_id, message };
    return await services.handlePostMessage(req, res, params);
};

module.exports.mark_read = async(req, res) => {
    const { messageId, recieverId } = req.body;
    let params = { messageId, recieverId };
    return await services.handleMarkMessageRead(req, res, params);
};

mmodule.exports.get_msg = async(req, res) => {
    const { recieverId, isRead } = req.body;
    let params = { recieverId, isRead };
    return await services.handleGetMessage(req, res, params);
};

module.exports.delete_msg = async(req, res) => {
    const { messageId, recieverId } = req.body;
    let params = { messageId, recieverId };
    return await services.handleDeleteMessage(req, res, params);
};