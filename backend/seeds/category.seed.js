const Category = require('../models/categoryModel');

const seedCategory = async () => {
    const parentCategories = [
        { name: "Điện thoại" },
        { name: "Laptop" },
        { name: "Tablet" },
        { name: "Đồng hồ thông minh" },
        { name: "Tai nghe" },
        { name: "Phụ kiện" }
    ];
    const childCategories = [
        { name: "Android", parent: "Điện thoại" },
        { name: "iPhone", parent: "Điện thoại" },

        { name: "Gaming", parent: "Laptop" },
        { name: "Văn phòng", parent: "Laptop" },
        { name: "Ultrabook", parent: "Laptop" }
    ]
    //seed category parent:
    for (const category of parentCategories) {
        await Category.updateOne(
            { name: category.name },
            {
                $set: {
                    name: category.name,
                    parent: null
                }
            },
            { upsert: true }
        );
    };
    //seed category child:
    const parents = await Category.find({ parent: null }).lean();
    const parentMap = {};
    parents.forEach(parent => {
        parentMap[parent.name] = parent._id;
    });
    for (const category of childCategories) {
        const parentId = parentMap[category.parent];
        if (!parentId) {
            console.log(`${category.parent} is not exists!`);
            continue;
        }
        await Category.updateOne(
            {
                name: category.name
            },
            {
                $set: {
                    name: category.name,
                    parent: parentId
                }
            },
            {
                upsert: true
            }

        );

    }
};
module.exports = seedCategory;
