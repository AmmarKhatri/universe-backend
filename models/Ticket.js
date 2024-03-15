const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    showNo: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the Users model
        required: true
    },
    type: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Tickets = mongoose.model('Tickets', TicketSchema);

module.exports = Tickets;
