const authService = require('../services/auth.service')


const register = async function (req, res) {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
}
const login = async function (req, res) {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
}

module.exports = { register, login }