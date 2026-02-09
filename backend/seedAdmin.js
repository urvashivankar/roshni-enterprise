const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: 'admin@roshni.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        const admin = new User({
            email: 'admin@roshni.com',
            password: 'adminpassword123', // User can change this later
            role: 'admin'
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        await admin.save();
        console.log('Admin user seeded successfully!');
        console.log('Email: admin@roshni.com');
        console.log('Password: adminpassword123');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
