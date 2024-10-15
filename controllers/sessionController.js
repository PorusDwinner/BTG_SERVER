const services = require('../services/sessionService');

module.exports.post_session = async (req, res) => {
    return await services.handlePost(
        req, 
        res, 
        { userId, mentorId, date, fee } = req.body
    );
};

module.exports.update_session = async (req, res) => {
    return await services.handleUpdate(
        req, 
        res, 
        { sessionId, date } = req.body
    );
};

module.exports.delete_session = async (req, res) => {
    return await services.handleDelete(
        req, 
        res, 
        { sessionId, date } = req.body
    );
};

module.exports.approve_session = async (req, res) => {
    return await services.handleApprove(
        req, 
        res, 
        { sessionId } = req.body
    );
};

module.exports.cancel_session = async (req, res) => {
    return await services.handleCancel(
        req,
        res,
        { sessionId, reason } = req.body
    );
};