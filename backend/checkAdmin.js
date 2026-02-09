const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('Admin found:', admin.email);
        } else {
            console.log('No admin found.');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAdmin();
