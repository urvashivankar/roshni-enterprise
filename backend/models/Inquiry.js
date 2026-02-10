const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    requirements: [{
        type: { type: String, required: true },
        units: { type: Number, required: true }
    }],
    additionalNotes: { type: String },
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
