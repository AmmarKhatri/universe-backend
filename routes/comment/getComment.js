const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");

async function getComment(req, res) {
    const { id: commentId } = req.params;
    
    // Find the comment by id
    const comment = await Comments.findById(commentId);

    // Check if the comment exists
    if (!comment) {
        return res.status(404).json({
            error: 1,
            message: "Comment not found"
        });
    }

    return res.status(200).json({
        error: 0,
        message: "Comment Found",
        comment,
    });
}

module.exports = getComment;