const {JWT_SECRET,JWT_EXPIRATION} = require('../config/config');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    try {
        return jwt.sign({userId},JWT_SECRET,{expiresIn: JWT_EXPIRATION});
    } catch (error) {
        throw error;
    }
}

const verifyToken = (token) =>{
    try{
        return jwt.verify(token,JWT_SECRET);
    }
    catch(err){
        throw new Error(err.message);
    }
}

module.exports = {generateToken,verifyToken};