import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Provide first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Provide last name.']
    },
    designation: {
        type: String,
        required: [true, 'Provide designation.']
    },
    companyName: {
        type: String,
        required: [true, 'Provide company name.']
    },
    phone: {
        type: String,
        required: [true, 'Provide phone number.']
    },
    websiteUrl: {
        type: String,
        required: [true, 'Provide website url.']
    }
});

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    },
    otp:{
        type: String,
    },
    details: detailsSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    otpCreatedAt: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    isDetailedComplete: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    expiresAt: Date,
});



const Admin = mongoose.models.admins || mongoose.model("admins", AdminSchema);

export default Admin;
