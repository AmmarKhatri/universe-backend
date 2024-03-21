const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},{ timestamps: true });

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;