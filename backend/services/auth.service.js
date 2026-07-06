const User = require('../models/userModel');
const Role = require('../models/roleModel');
const generateToken = require('../utils/generateToken')
const authService = {};
authService.register = async (data) => {
    if (!data.name?.trim()) {
        throw new Error('Name is required');
    }
    if (!data.password) {
        throw new Error('Password is required');
    }
    if (!data.email?.trim()) {
        throw new Error('Email is required')
    }
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const role = await Role.findOne({ name: 'customer' });
    if (!role) {
        throw new Error('Customer role is not found! ')
    }
    const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: role._id
    });
    return {
        _id: user._id,
        name: user.name,
        email: user.email
    }
};
authService.login = async (data) => {
    if (!data.email?.trim()) {
        throw new Error('Email is required!');
    }
    if (!data.password?.trim()) {
        throw new Error('Password is required!');
    }
    const user = await User.findOne({ email: data.email }).select('+password').populate('role');
    if (!user) {
        throw new Error('Account not exits!');
    }
    const checkPassword = await user.matchPassword(data.password);
    if (!checkPassword) {
        throw new Error('Password is not correct!');
    }
    return {
        _id: user._id,
        name: user.name,
        avatar: user.avata,
        email: user.email,
        role: user.role.name,
        token: generateToken({ id: user._id, role: user.role.name }),
    }
};

module.exports = authService;