const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expiry = 7 * 24 * 60 * 60 * 1000;
const { NResposne } = require('../responses/response');
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET;

module.exports.handleSignup = async (req, res, params) => {
    const { email, password } = params;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: expiry });
        return res.status(201).json(
            new NResposne(
                1,
                "Succesfully registered",
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
            return res.status(400).json(new NResposne(
                0,
                "Wrong credentials",
                '',
                []
            ));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(new NResposne(
                0,
                "No such user found",
                '',
                []
            ));
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

        const token = jwt.sign(
            { id: user._id, email: user.email },
            jwtKey,
            { expiresIn: expiry }
        );

        return res.status(200).json(new NResposne(

            1,
            "Login Succesfull",
            token,
            user
        ));
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(new NResposne(
            0,
            'Internal server error',
            '',
            []
        ));
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
    catch (err){
        console.log("Error in delete user =>",err);
        return res.status(500).json(new NResposne(
            0,
            "Internal server error",
            "",
            []
        ))
    };
};

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

function createToken(id) {
    return jwt.sign(
        { id },
        jwtKey,
        { expiresIn: 3 * 24 * 60 * 60 * 1000 }
    )
};