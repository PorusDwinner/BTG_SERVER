require('dotenv').config();
const services = require('../services/authService');

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    let params = { email, password };
    return await services.handleSignup(req, res, params);
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    let params = { email, password };
    return await services.handleLogin(req, res, params);
};

module.exports.signup_get = async (req, res) => {
    res.status(200).json("Signup Page")
};

module.exports.login_get = async (req, res) => {
    res.status(200).json("Login Page")
};           