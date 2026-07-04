const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    },
        process.env.JWT_SECRETKEY,
        { expiresIn: process.env.JWT_EXPIRESIN });
};
module.exports = generateToken;