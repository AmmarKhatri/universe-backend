const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");
const { PostCounter, CommentCounter } = require("../../models/sqlModel");

async function createComment(req, res) {
  try {
    const { id } = req.user;
    const { post_id, comm_id, comment_id, description } = req.body;
    
     // Find the post by id
     const post = await Posts.findById(post_id);

     // Check if the post exists
     if (!post) {
         return res.status(404).json({
             error: 1,
             message: "Post not found"
         });
     }


    const comment = await Comments.create({
      description: description,
      postId: post_id,
      community: comm_id,
      comment: comment_id ? comment_id : null,
      createdBy: id,
    });

    // update PostCounter in pg db
    let postCounter = await PostCounter.findOne({ where: { postId: post_id } });
    if (!postCounter) {
      return res.status(404).json({
        error: 1,
        message: "Post not found",
      });
    }

    postCounter.increment("comments", { by: 1 })

    // create CommentCounter in pg db
    await CommentCounter.create({ commentId: comment._id.toString(), likes: 0, dislikes: 0 });
    
    return res.status(201).json({
      error: 0,
      message: "Created Comment Successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = createComment;
