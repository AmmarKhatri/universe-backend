const Posts = require("../../models/Post");
const Comments = require("../../models/Comment");
async function createComment(req, res) {
  try {
    const { id, role } = req.user;
    const { post_id, comment_id } = req.body;
    
     // Find the post by id
     const post = await Posts.findById(postId);

     // Check if the post exists
     if (!post) {
         return res.status(404).json({
             error: 1,
             message: "Post not found"
         });
     }


    const comment = await Comments.create({
      ...req.body,
      post: post_id,
      comment: comment_id ? comment_id : null,
      createdBy: id,
    });
    
    // create a counter entry into our pg db as well
    PostImpression.create({
      postId: post.id,
      userId: id,
      impression: true,
    });
    return res.status(201).json({
      error: 0,
      message: "Created Comment Successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = createPost;
