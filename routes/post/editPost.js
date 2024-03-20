const bcrypt = require('bcrypt');
const Users = require("../../models/User");
const Posts = require('../../models/Post');

async function editPost(req, res) {
    try {
        const { id } = req.user;
        const { description } = req.body;
        const postId = req.params.id;

        // Find the post by id
        const post = await Posts.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({
                error: 1,
                message: "Post not found"
            });
        }

        // Check if the user is the creator of the post
        if (post.createdBy.toString() !== id) {
            return res.status(403).json({
                error: 1,
                message: "You are not authorized to edit this post"
            });
        }

        // Update the post
        const updatedPost = await Posts.findOneAndUpdate(
            { _id: postId },
            { $set: { updatedAt: Date.now(), description } },
            { new: true } // Returns the document after update was applied
        );

        // Return the updated post object
        return res.status(200).json({
            error: 0,
            message: "Post edited successfully",
            post: updatedPost
        });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ 
            error: 1,
            message: "Could not update user" 
        });
    }
}

module.exports = editPost;
