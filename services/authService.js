const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SendEmail = require('./emailService');
const { Message_Modal, Mailer_Config } = require('../models/emailModal');
const expiry = 7 * 24 * 60 * 60 * 1000;
const { NResposne } = require('../responses/response');
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET;

module.exports.handleSignup = async (req, res, params) => {
    const { email, password } = params;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('token', token, {
            maxAge: expiry,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });

        let mailConfig = new Mailer_Config(
            process.env.EMAIL_SP,
            process.env.EMAIL_AUTH_USER,
            process.env.EMAIL_AUTH_PASSWORD
        );

        let message = new Message_Modal(
            process.env.EMAIL_SENDER,
            user.email,
            "Thanx for registerng Gamerzz LMS, we wish you best for your learning journey",
            "Gamerzz LMS Registration",
            "<b>Welcome to Gamerzz LMS</b>"
        );

        let emailResult = await SendEmail(mailConfig, message);
        if(!emailResult){
            return res.status(201).json(
                new NResposne(
                    1,
                    "Succesfully registered but failed to send confirmation email",
                    token,
                    user
                )
            );
        }

        return res.status(201).json(
            new NResposne(
                1,
                `Succesfully registered & an confirmation email sent to ${user.email}`,
                token,
                user
            )
        );
    }
    catch (err) {
        console.log("Error => ", err);
        const errors = handleErrors(err);
        return res.status(400).json(
            new NResposne(
                0,
                'Failed to register',
                '',
                errors
            )
        );
    }
};

module.exports.handleLogin = async (req, res, params) => {
    try {
        const { email, password } = params;

        if (!email || !password) {
            return res.status(400).json(new NResposne(0, "Wrong credentials", '', []));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(new NResposne(0, "No such user found", '', []));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(new NResposne(0, "Wrong password", '', []));
        }

        const token = createToken(user._id, user.email);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None',
            maxAge: expiry,
        });

        return res.status(200).json(new NResposne(1, "Login Successful", token, user));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new NResposne(0, 'Internal server error', '', []));
    }
};

module.exports.handleDelete = async (req, res, params) => {
    try {
        const { email, password } = params;
        if (!email || !password) {
            return new NResposne(
                0,
                "Wrong credentials",
                "",
                []
            )
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(new NResposne(
                0,
                "User not found",
                "",
                []
            ))
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(new NResposne(
                0,
                "Wrong password",
                '',
                []
            ))
        };

        const result = await User.deleteOne({ email });
        if (result.deleteCount == 0) {
            return res.status(401).json(new NResposne(
                0,
                "Failed to delete, please try again later",
                '',
                []
            ))
        };

        return res.status(201).json(new NResposne(
            0,
            `${email} deleted`,
            '',
            []
        ));
    }
    catch (err) {
        console.log("Error in delete user =>", err);
        return res.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ))
    };
};

module.exports.handleGetForgotPassword = async(req, res, params) => {};

module.exports.handlePostForgotPassword = async(req, res, params) => {};

function handleErrors(err) {
    let errors = { email: '', password: '' }

    if (err.code == 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
};

function createToken(id, email) {
    return jwt.sign(
        { id, email },
        jwtKey,
        { expiresIn: expiry }
    )
};