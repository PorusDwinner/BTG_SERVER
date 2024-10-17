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
        { email, password } = req.body
    );
};

module.exports.logout_user = async (req, res) => {
    res.cookie('token','',{ maxAge : 1 });
};

module.exports.forgot_password_get = async (req, res) => {
    return await services.handleGetForgotPassword(
        req,
        res,
        { email } = req.body
    );
};

module.exports.forgot_password_post = async (req, res) => {
    return await services.handlePostForgotPassword(
        req,
        res,
        {  } = req.body
    );
};
