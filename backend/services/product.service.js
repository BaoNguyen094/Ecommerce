const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const productVariant = require('../models/productVariantModel');
const productService = {};
const most =
{
    "name": "iPhone 16",
    "brand": "6870.....",
    "category": "6870.....",
    "description": "...",
    "images": [
        "thumbnail.jpg"
    ],
    "variants": [
        {
            "sku": "IP16-BLK-128",
            "price": 22000000,
            "stock": 10,
            "images": [
                "black1.jpg",
                "black2.jpg"
            ],
            "attribute": [
                {
                    "key": "color",
                    "value": "Black"
                },
                {
                    "key": "storage",
                    "value": "128GB"
                }
            ]
        }
    ]
}
productService.createProduct = async (data) => {
    const { variants, ...product } = data;
    let category, brand;
    //validate:
    if (!product.name) {
        throw new Error('Name required!');
    };
    if (product.brand) {
        brand = await Brand.findOne({ name: product.brand });
        if (!brand) {
            throw new Error('Brand not exists!');
        }
    };
    if (product.category) {
        category = await Category.findOne({ name: product.category });
        if (!category) {
            throw new Error('Category not exists!')
        }
    }
    //check sku variant:
    const skuCount = new Map();
    for (const variant of variants) {
        skuCount.set(variant.sku, (skuCount.get(variant.sku) || 0) + 1);
    }
    const duplicate = [];
    for (const [sku, count] of skuCount) {
        if (count > 1) duplicate.push(sku);
    };
    if (duplicate.length > 0) {
        throw new Error(`Sku duplicate ${duplicate}`);
    };
    const dataSku = await productVariant.distinct('sku');
    for (const [sku] of skuCount) {
        if (dataSku.includes(sku)) {
            throw new Error('sku is exists!');
        }
    };
    for (const variant of variants) {
        if (!variant.price || Number(variant.price) === 0) {
            throw new Error('Price alway than 0');
        };
        if (!variant.stock || Number(variant.stock) === 0) {
            throw new Error('Stock alway than 0')
        };
    }


    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const saveProduct = new Product(product);
        saveProduct.category = category._id;
        saveProduct.brand = brand._id;
        saveProduct.slug = product.name.trim().toLowerCase().replace(/\s+/g, '_');
        await saveProduct.save({ session });
        for (const variant of variants) {
            variant.product = saveProduct._id;
        };
        const saveVariant = await productVariant.create(variants, { session });

        await session.commitTransaction();
        return [saveProduct, saveVariant];
    } catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        await session.endSession();
    }

}

module.exports = productService;