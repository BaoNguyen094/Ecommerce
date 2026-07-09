const express = require('express')
const productRouter = express.Router();
const { createProduct } = require('../controllers/productController');
const protect = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');


productRouter.post('/', protect, authorize('admin'), createProduct);

module.exports = productRouter;