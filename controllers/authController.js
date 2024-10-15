require('dotenv').config();
const services = require('../services/authService');

module.exports.signup_post = async (req, res) => {
    return await services.handleSignup(
        req, 
        res, 
        { email, password } = req.body
    );
};

module.exports.login_post = async (req, res) => {
    return await services.handleLogin(
        req, 
        res, 
        { email, password } = req.body
    );
};

module.exports.delete_user = async (req, res) => {
    return await services.handleDelete(
        req, 
        res, 
        {email, password} = req.body
    );
};

module.exports.logout_user = async (req, res) => {
    res.cookie('token','',{ maxAge : 1 });
};
