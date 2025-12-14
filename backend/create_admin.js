const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const email = 'admin@roshni.com';
        const password = 'admin'; // Simple password for initial setup

        let user = await User.findOne({ email });
        if (user) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Admin user created successfully');
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
