const User = require('../models/userModel');
const userService = {};
userService.getUserProfile = async (data) => {
    const user = await User.findById(data._id).populate('role', 'name');
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        providers: user.providers,
        role: user.role.name
    }
}
module.exports = userService;