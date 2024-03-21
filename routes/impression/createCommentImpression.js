const Comments = require("../../models/Comment");
const { CommentCounter, CommentImpression } = require("../../models/sqlModel");

async function createCommentImpression(req, res) {
  try {
    const { id } = req.user;
    const { id: comment_id } = req.params;
    const { impression } = req.body;

    // Find the comment by id
    const comment = await Comments.findById(comment_id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({
        error: 1,
        message: "Comment not found",
      });
    }

    const existingImpression = await CommentImpression.findOne({
      where: { commentId: comment_id.toString(), userId: id.toString() },
    });
    let commentCounter = await CommentCounter.findOne({
      where: { commentId: comment_id.toString() },
    });
    if (!commentCounter) {
      return res.status(404).json({
        error: 1,
        message: "Comment not found",
      });
    }

    if (existingImpression) {
      if (existingImpression.impression === impression) {
        CommentImpression.destroy({
          where: { commentId: comment_id.toString(), userId: id.toString() },
        });

        // update CommentCounter in pg db
        if (impression) {
          commentCounter.decrement("likes", { by: 1 });
        } else {
          commentCounter.decrement("dislikes", { by: 1 });
        }
      } else {
        existingImpression.impression = impression;
        existingImpression.save();

        // update CommentCounter in pg db
        if (impression) {
          commentCounter.increment("likes", { by: 1 });
          commentCounter.decrement("dislikes", { by: 1 });
        } else {
          commentCounter.increment("dislikes", { by: 1 });
          commentCounter.decrement("likes", { by: 1 });
        }
      }
    } else {
      const commentImpression = await CommentImpression.create({
        commentId: comment_id,
        userId: id,
        impression: impression,
      });

      // update CommentCounter in pg db
      if (impression) {
        commentCounter.increment("likes", { by: 1 });
      } else {
        commentCounter.increment("dislikes", { by: 1 });
      }
    }

    return res.status(201).json({
      error: 0,
      message: "Created Comment Impression Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = createCommentImpression;
