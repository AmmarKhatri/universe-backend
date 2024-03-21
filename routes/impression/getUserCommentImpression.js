const { CommentImpression } = require("../../models/sqlModel");

async function getUserCommentImpression(req, res) {
    const { id } = req.user;
    const { id: commentId } = req.params;

    // Find the comment impression by comment id and user id
    const commentImpression = await CommentImpression.findOne({
        commentId,
        userId: id,
    });

    return res.status(200).json({
        error: 0,
        message: "Comment Impression Found",
        commentImpression,
    });
}

module.exports = getUserCommentImpression;

