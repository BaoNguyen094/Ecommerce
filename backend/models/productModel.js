const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    countInStock: {
        type: Number,
        min: 0,
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
    }],
    slug: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    sold: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    numberView: {
        type: Number,
    },
});
const Product = mongoose.model('Product', productSchema);
exports.model = Product;
