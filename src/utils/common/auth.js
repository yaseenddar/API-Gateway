const bcrypt = require('bcrypt');
const { ServerConfig } = require('../../config');
const jwt = require('jsonwebtoken')


function checkPassword(plainPassword,encryptedPassword){
    try { 
        return bcrypt.compareSync(plainPassword,encryptedPassword);
    } catch (error) {
        throw error;
    }
}

function createToken(input){
    try {
        console.log("first",ServerConfig.EXPIRY_TIME)
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.EXPIRY_TIME});
    } catch (error) {
        throw error;
    }
}
function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch(error) {
        throw error;
    }
}
module.exports = {
    verifyToken,
    createToken,
    checkPassword
}