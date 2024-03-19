const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isArchived: {
        type: Boolean,
        default: false
    }
});

const Community = mongoose.model('Communities', CommunitySchema);

module.exports = Community;
