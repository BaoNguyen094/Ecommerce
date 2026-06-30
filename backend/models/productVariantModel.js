const mongoose = require('mongoose');
const productVariantSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    attribute: [{
        key: { type: String },
        value: { type: String }
    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    countInstock: {
        type: Number,
        default: 0,
        min: 0
    },
    sku: {
        type: String,
        unique: true
    },
    images: [{ type: String }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const productVariant = mongoose.model('ProductVariant', productVariantSchema);
module.exports = productVariant;
