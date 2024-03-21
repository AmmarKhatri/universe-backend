const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");
const { PostCounter } = require("../../models/sqlModel");
const { CommentCounter } = require("../../models/sqlModel");

async function deleteComment(req, res) {
    const { id } = req.user;
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

    // Check if the user is the creator of the comment
    if (comment.createdBy.toString() !== id) {
        return res.status(401).json({
            error: 1,
            message: "Unauthorized"
        });
    }

    // Delete the comment
    await Comments.deleteOne({ _id: commentId });
    // destroy CommentCounter in pg db
    await CommentCounter.destroy({ where: { commentId: commentId.toString() } });

    // update PostCounter in pg db
    let postCounter = await PostCounter.findOne({ where: { postId: comment.postId.toString() } });
    if (!postCounter) {
        return res.status(404).json({
            error: 1,
            message: "Post not found",
        });
    }

    postCounter.decrement("comments", { by: 1 })


    return res.status(304).json({
        error: 0,
        message: "Deleted Comment Successfully",
    });
}

module.exports = deleteComment;