const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const expiry = 7 * 24 * 60 * 60 * 1000;
const { NResposne } = require('../responses/response');

module.exports.signup_post = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('token',token, { httpOnly : true, maxAge : expiry });
        return res.status(201).json(
            new NResposne(
                1,
                "Succesfully registered",
                token,
                user
            )
        )
    }
    catch (err){
        const errors = handleErrors(err);
        return res.status(400).json(
            new NResposne(
                0,
                'Failed to register',
                '',
                errors
            )
        )
    }
};

module.exports.login_post = async(req, res) => {
    
}

module.exports.signup_get = async(req, res) => {
    res.status(200).json("Signup Page")
};

module.exports.login_get = async(req, res) => {
    res.status(200).json("Login Page")
};

function handleErrors(err){
    let errors = { email : '', password : ''}

    if(err.code == 11000){
        errors.email = "Email is already registered";
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
};

function createToken(id){
    return jwt.sign(
        { id },
        'jwtsecretkey',
        { expiresIn : 3*24*60*60*1000 }
    )
};
