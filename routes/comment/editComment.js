const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");

async function editComment(req, res) {
  const { id } = req.user;
  const { id: commentId } = req.params;
  const { description } = req.body;

  // Find the comment by id
  const comment = await Comments.findById(commentId);

  // Check if the comment exists
  if (!comment) {
    return res.status(404).json({
      error: 1,
      message: "Comment not found",
    });
  }

  // Check if the user is the creator of the comment
  if (comment.createdBy.toString() !== id) {
    return res.status(401).json({
      error: 1,
      message: "Unauthorized",
    });
  }

  // Update the comment
  await Comments.findByIdAndUpdate(commentId, { description });

  return res.status(200).json({
    error: 0,
    message: "Updated Comment Successfully",
  });
}

module.exports = editComment;
