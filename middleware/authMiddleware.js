const jwt = require('jsonwebtoken');
const { NResposne } = require('../responses/response');
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET;

const isAuthorized = (req, res, next) => {
    const authToken = req.cookie.token;
    if (authToken) {
        jwt.verify(authToken, jwtKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json(new NResposne(
                    0,
                    "Authorization failed, please login again",
                    "",
                    []
                ))
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json(new NResposne(
            0,
            "Authorization failed, please login again",
            "",
            []
        ))
    };
};

module.exports = { isAuthorized };