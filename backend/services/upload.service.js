const uploadService = {};
uploadService.uploadProductImage = (file) => {
    if (!file) {
        throw new Error('Image is required');
    }
    return {
        filename: file.filename,
        url: `uploads/products/${file.filename}`
    };
};
module.exports = uploadService;
