const jwt = require('jsonwebtoken');
const secretKey = '123abc';
const generateToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '30d' });
};
module.exports = generateToken;