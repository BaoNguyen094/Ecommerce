const Role = require('../models/roleModel');

const seedRole = async () => {
    const roles = [
        { name: 'admin' },
        { name: 'customer' }
    ];

    for (const role of roles) {
        await Role.updateOne(
            { name: role.name },
            { $set: role },
            {
                upsert: true
            }
        );
    };
}
module.exports = seedRole;
