const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    // can be a comment on another comment
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        required: false
    },
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

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
