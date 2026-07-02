const User = require('../models/userModel');
const authService = {};
authService.register = async (data) => {
    if (!data.name) {
        throw new Error('Name is required');
    }
    if (!data.password) {
        throw new Error('Password is required');
    }
    if (!data.email) {
        throw new Error('Email is required')
    }
    const emailValid = await User.findOne({ email: data.email });
    if (emailValid) {
        throw new Error('Email already exists');
    }
    if (!role) {
        throw new Error('Role is required')
    }
    const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
    });
    if (user) {
        const userInfo = await User.findById(user._id).populate('role');
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: userInfo.role.name
        }
    }
    else { throw new Error('Register failse') }
};

module.exports = authService;