const uploadService = require('../services/upload.service');
const uploadProductImage = async (req, res) => {
    const result = await uploadService.uploadProductImage(req.file);
    res.status(200).json(result);
};

module.exports = { uploadProductImage };