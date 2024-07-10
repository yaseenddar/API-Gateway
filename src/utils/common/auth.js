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
        // console.log("first",ServerConfig.JWT_SECRET)
        return jwt.sign(input,'Yaseen212',{expiresIn:'1h'});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createToken,
    checkPassword
}