const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const protect = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Not login!' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
        const user = await User.findById(payload.id).select('_id name email avatar isActive role').populate('role');
        if (!user) {
            return res.status(401).json('Not found email!');
        }
        if (!user.isActive) {
            return res.status(401).json('Email is locked!')
        }
        req.user = {
            _id: user._id,
            role: user.role.name
        };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'token is not verify!' });
    }

};

module.exports = protect;
