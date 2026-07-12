const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const ProductVariant = require('../models/productVariantModel');
const productService = {};

productService.createProduct = async (data) => {
    const { variants, ...product } = data;
    let category, brand;
    //validate:
    if (!product.name?.trim()) {
        throw new Error('Name required!');
    };

    if (!product.description?.trim()) {
        throw new Error('Description is required!');
    };
    if (!Array.isArray(variants) || variants.length === 0) {
        throw new Error('At least one variants is required!')
    };
    for (const variant of variants) {
        const price = Number(variant.price);
        if (Number.isNaN(price) || price <= 0) {
            throw new Error('Price must be greater than 0.');
        };
        const stock = Number(variant.stock)
        if (Number.isNaN(stock) || stock < 0) {
            throw new Error('Stock cannot be negative.')
        };
        if (!Array.isArray(variant.images) || variant.images.length === 0) {
            throw new Error(`Images of variant ${variant.sku} is required!`)
        };
        for (const image of variant.images) {
            if (!(typeof image === 'string') || image.trim() === '') {
                throw new Error('Image is not URL!');
            }
        }
    };
    const skuCount = new Map();
    for (const variant of variants) {
        if (!variant.sku?.trim()) {
            throw new Error('Sku is required!');
        }
        skuCount.set(variant.sku, (skuCount.get(variant.sku) || 0) + 1);
    };
    const duplicate = [];
    for (const [sku, count] of skuCount) {
        if (count > 1) duplicate.push(sku);
    };
    if (duplicate.length > 0) {
        throw new Error(`Sku duplicate ${duplicate.join(', ')}`);
    };
    const listSku = [...skuCount.keys()];
    const dataSku = await ProductVariant.find({
        sku: {
            $in: listSku
        },
    });
    if (dataSku.length > 0) {
        const existed = dataSku.map(v => v.sku);
        throw new Error(`Sku is exists ${existed.join(', ')}`);
    }

    if (mongoose.Types.ObjectId.isValid(product.brand)) {
        brand = await Brand.findById(product.brand);
        if (!brand) {
            throw new Error('Brand not exists!');
        }
    } else {
        throw new Error('Bran is required!')
    };
    if (mongoose.Types.ObjectId.isValid(product.category)) {
        category = await Category.findById(product.category);
        if (!category) {
            throw new Error('Category not exists!')
        };
    } else {
        throw new Error('Category is required!')
    };


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
        const saveVariant = await ProductVariant.create(variants, { session });

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