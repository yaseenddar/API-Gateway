const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    EXPIRY_TIME:process.env.EXPIRY_TIME,
    JWT_SECRET:process.env.JWT_SECRET
}