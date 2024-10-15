const services = require('../services/userService');

module.exports.get_dp = async(req, res) => {
    return await services.handleGetDp(
        req,
        res,
        { userId } = req.body
    );
};

module.exports.update_profile = async(req, res) => {
    
};