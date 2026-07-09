const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    const result = await productService.createProduct(req.body);
    res.status(200).json(result);
};

module.exports = { createProduct };
