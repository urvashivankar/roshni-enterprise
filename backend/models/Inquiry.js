const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name is too long']
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true,
        maxlength: [30, 'Name is too long']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [25, 'Email cannot exceed 25 characters'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits']
    },
    requirements: [{
        type: {
            type: String,
            required: [true, 'Service type is required'],
            trim: true
        },
        units: {
            type: Number,
            required: [true, 'Number of units is required'],
            min: [1, 'Units must be at least 1']
        }
    }],
    additionalNotes: {
        type: String,
        maxlength: [500, 'Notes are too long']
    },
    quotation: {
        amount: { type: Number },
        notes: { type: String },
        pdfUrl: { type: String },
        sentAt: { type: Date }
    },
    adminNotes: { type: String },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Quotation Sent', 'Contacted', 'Closed']
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
