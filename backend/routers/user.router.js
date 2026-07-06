const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const protect = require('../middlewares/auth.middleware');
const userRouter = express.Router();

userRouter.get('/profile', protect, getUserProfile);
module.exports = userRouter;

