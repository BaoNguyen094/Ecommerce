const authService = require('../services/auth.service')


const register = async function (req, res) {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
}

module.exports = { register }