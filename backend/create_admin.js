const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@roshni.com';
        const adminPassword = 'admin123'; // 8 chars min for safety, though model doesn't enforce length, only controller
        const phoneNumber = '9000000000';

        // Check if user already exists
        let user = await User.findOne({ email: adminEmail });
        if (user) {
            console.log('Admin user already exists. Force resetting password and role...');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(adminPassword, salt);
            user.role = 'admin';
            if (!user.phoneNumber) {
                user.phoneNumber = phoneNumber;
            }
            await user.save();
            console.log('Admin credentials updated successfully.');
        } else {
            console.log('Creating new Admin user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            user = new User({
                email: adminEmail,
                phoneNumber: phoneNumber,
                password: hashedPassword,
                role: 'admin'
            });

            await user.save();
            console.log('Admin user created successfully.');
        }

        console.log('---------------------------');
        console.log('Admin ID: ' + adminEmail);
        console.log('Password: ' + adminPassword);
        console.log('---------------------------');

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err.message);
        process.exit(1);
    }
};

createAdmin();
