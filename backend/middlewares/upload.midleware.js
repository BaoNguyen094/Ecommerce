const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
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

const upload = multer({ storage });
module.exports = upload;