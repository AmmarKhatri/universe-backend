const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Communities',
        required: true
    },
    attachments: [{
        type: String,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    attributes: { // any sort of additional attributes
        type: JSON,
        required: false
    },
},{ timestamps: true });

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;
