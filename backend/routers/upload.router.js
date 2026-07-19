const express = require('express');
const protect = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const upload = require('../middlewares/upload.midleware');
const { uploadProductImage } = require('../controllers/upload.controller');
const uploadRouter = express.Router();
uploadRouter.post('/product-image', protect, authorize('admin'), upload.single('image'), uploadProductImage);
module.exports = uploadRouter;
