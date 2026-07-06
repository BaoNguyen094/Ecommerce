const connectDB = require('./config/db');
const seedRole = require('./seeds/role.seed');
const seedBrand = require('./seeds/brand.seed');
const seedCategory = require('./seeds/category.seed')
async function run() {
    try {
        await connectDB();
        await seedRole();
        await seedBrand();
        await seedCategory();
        console.log('Seed Done!');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
run();