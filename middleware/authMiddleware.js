const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtKey = process.env.JWT_SECRET;

const isAuthorized = (req, res, next) => {
    const authToken = req.cookie.token;
    if(authToken){
        jwt.verify(authToken, jwtKey, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                return false;
            } else {
                next();
            }
        });
    } else return false;
};

module.exports = { isAuthorized };