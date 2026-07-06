const Brand = require('../models/brandModel');

const seedBrand = async () => {
    const brands = [
        {
            name: 'Apple',
            image: 'apple.png',
            description: 'Apple Inc.'
        },
        {
            name: 'Samsung',
            image: 'samsung.png',
            description: 'Samsung Electronics'
        },
        {
            name: 'Xiaomi',
            image: 'xiaomi.png',
            description: 'Xiaomi Corporation'
        },
        {
            name: 'OPPO',
            image: 'oppo.png',
            description: 'OPPO Mobile'
        },
        {
            name: 'ASUS',
            image: 'asus.png',
            description: 'ASUS Computer'
        },
        {
            name: 'Dell',
            image: 'dell.png',
            description: 'Dell Technologies'
        },
        {
            name: 'HP',
            image: 'hp.png',
            description: 'HP Inc.'
        },
        {
            name: 'Lenovo',
            image: 'lenovo.png',
            description: 'Lenovo Group'
        },
        {
            name: 'Sony',
            image: 'sony.png',
            description: 'Sony Corporation'
        },
        {
            name: 'LG',
            image: 'lg.png',
            description: 'LG Electronics'
        }
    ];
    for (const brand of brands) {
        await Brand.updateOne(
            { name: brand.name },
            { $set: brand },
            { upsert: true }
        );
    }
};
module.exports = seedBrand;