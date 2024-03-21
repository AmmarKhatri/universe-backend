const { PostImpression } = require("../../models/sqlModel");

async function getUserPostImpression(req, res) {
    const { id } = req.user;
    const { id: postId } = req.params;

    // Find the post impression by post id and user id
    const postImpression = await PostImpression.findOne({
        postId,
        userId: id,
    });

    return res.status(200).json({
        error: 0,
        message: "Post Impression Found",
        postImpression,
    });
}

module.exports = getUserPostImpression;