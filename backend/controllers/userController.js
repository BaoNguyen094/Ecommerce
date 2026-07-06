const userService = require('../services/user.service');

const getUserProfile = async (req, res) => {
    const result = await userService.getUserProfile(req.user);
    return res.status(200).json(result);
}

module.exports = { getUserProfile }
