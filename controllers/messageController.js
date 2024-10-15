require('dotenv').config();
const services = require('../services/messageService');

module.exports.send_msg = async(req, res) => {
    return await services.handlePostMessage(
        req, 
        res, 
        { sender_id, reciever_id, message } = req.body
    );
};

module.exports.mark_read = async(req, res) => {
    return await services.handleMarkMessageRead(
        req, 
        res, 
        { messageId, recieverId } = req.body
    );
};

module.exports.get_msg = async(req, res) => {
    return await services.handleGetMessage(
        req, 
        res, 
        { recieverId, isRead } = req.body
    );
};

module.exports.delete_msg = async(req, res) => {
    return await services.handleDeleteMessage(
        req, 
        res, 
        { messageId, recieverId } = req.body
    );
};

module.exports.update_msg = async(req, res) => {
    return await services.handleUpdateMessage(
        req,
        res,
        { messageId, message } = req.body
    );
};