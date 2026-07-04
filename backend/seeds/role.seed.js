const Role = require('../models/roleModel');

const seedRole = async () => {
    const roles = [
        { name: 'admin' },
        { name: 'customer' }
    ];

    for (const role of roles) {
        await Role.updateOne(
            { name: role.name },
            { $set: role },//set tập trung vào trường mình muốn update
            {
                upsert: true
            }
        );
    };
}
module.exports = seedRole;
