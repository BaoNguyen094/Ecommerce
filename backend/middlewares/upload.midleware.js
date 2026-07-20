const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const allowTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
]);
const allowExtensions = ['JPEG', 'PNG', 'WEBBP'];
const limits = {
    fileSize: 5 * 1024 * 1024
};
const storage = multer.diskStorage({
    //Quyết định nơi lưu file
    destination(req, file, cb) {
        cb(null, 'uploads/products')
    },
    //tạo tên file để lưu
    filename(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = uuidv4();
        cb(null, fileName + ext);
    },
});

const fileFilter = (req, file, cb) => {
    if (allowTypes.has(file.mimetype)) {
        return cb(null, true);
    } else {
        return cb(new Error(`Only ${allowExtensions.join(',')} image are allowed!`));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 30
    }
});
module.exports = upload;