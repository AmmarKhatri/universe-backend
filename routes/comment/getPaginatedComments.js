const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");

async function getPaginatedComments(req, res) {
  try {
    const post_id = req.params.id;
    const limit = parseInt(req.query.limit) || 5; // default limit
    const offset = parseInt(req.query.offset) || 0; // default offset

    // Find the post by id
    const post = await Posts.findById(post_id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        error: 1,
        message: "Post not found",
      });
    }

    // Find the comments of the post
    const comments = await Comments.find({ postId: post_id })
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const totalComments = await Comments.countDocuments({ postId: post_id });

    return res.status(200).json({
      error: 0,
      message: "Comments Found Successfully",
      pagination: {
        page: offset / limit,
        records_per_page: limit,
        total_records: totalComments,
        total_pages: Math.ceil(totalComments / limit),
      },
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = getPaginatedComments;
