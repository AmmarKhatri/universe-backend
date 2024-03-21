const Posts = require("../../models/Post");
const { PostCounter, PostImpression } = require("../../models/sqlModel");

async function createPostImpression(req, res) {
  try {
    const { id } = req.user;
    const { id: post_id } = req.params;
    const { impression } = req.body;

    // Find the post by id
    const post = await Posts.findById(post_id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        error: 1,
        message: "Post not found",
      });
    }

    const existingImpression = await PostImpression.findOne({
      where: { postId: post_id.toString(), userId: id.toString() },
    })
    let postCounter = await PostCounter.findOne({
      where: { postId: post_id.toString() },
    });
    if (!postCounter) {
      return res.status(404).json({
        error: 1,
        message: "Post not found",
      });
    }
    if (existingImpression) {
      if (existingImpression.impression === impression) {
        PostImpression.destroy({
          where: { postId: post_id.toString(), userId: id.toString() },
        });

        // update PostCounter in pg db
        if (impression) {
          postCounter.decrement("likes", { by: 1 });
        } else {
          postCounter.decrement("dislikes", { by: 1 });
        }
      } else {
        existingImpression.impression = impression;
        existingImpression.save();

        // update PostCounter in pg db
        if (impression) {
          postCounter.increment("likes", { by: 1 });
          postCounter.decrement("dislikes", { by: 1 });
        } else {
          postCounter.increment("dislikes", { by: 1 });
          postCounter.decrement("likes", { by: 1 });
        }
      }
    } else {
      const postImpression = await PostImpression.create({
        postId: post_id,
        userId: id,
        impression: impression,
      });

      // update PostCounter in pg db
      if (impression) {
        postCounter.increment("likes", { by: 1 });
      } else {
        postCounter.increment("dislikes", { by: 1 });
      }
    }

    return res.status(201).json({
      error: 0,
      message: "Created Post Impression Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = createPostImpression;
