const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    slug: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numberReviews: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
exports.model = Product;
