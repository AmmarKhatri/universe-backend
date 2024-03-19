const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // Ensures email is unique
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true, // Ensures username is unique
        required: true
    },
    studentID: {
        type: String,
        required: false //
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    role: { 
        type: String, 
        enum: ['SUPERADMIN','ADMIN', 'STUDENT', 'SPONSOR'], // Initial roles
        default: 'STUDENT'
    },
    attributes: { // any sort of additional attributes
        type: JSON,
        required: false
    },
}, { timestamps: true });

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
