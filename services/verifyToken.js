const jwt = require('jsonwebtoken');
require('dotenv').config()

async function verifyToken(token) {
    try {
        return jwt.verify( token, process.env.SECRETE_KEY );
    } catch (err) {
        return err;
    }
}

module.exports = {
    verifyToken
}