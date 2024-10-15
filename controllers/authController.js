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

module.exports.delete_user = async (req, res) => {
    const { email, password } = req.body;
    let params = { email, password};
    return await services.handleDelete(req, res, {email, password} = req.body);
}
