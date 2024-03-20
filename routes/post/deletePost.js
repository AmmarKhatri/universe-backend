const Posts = require("../../models/Post");
const PostCounter = require("../../models/PostCounter");

async function deletePost(req, res) {
    try {
        const post_id = req.params.id;
        const {id, role} = req.user;
        //if there is a userID present, only admin can delete
        const post = await Posts.findOne({ _id: post_id });
        // If user is not found
        if (!post) {
            return res.status(404).json({ 
                error: 1,
                message: "Post not found" 
            });
        }
        //owner - moderators - admin - superadmins only delete
        if (!(post.createdBy == id || post.moderators.includes(id) || role == 'ADMIN' || role == 'SUPERADMIN')){
            return res.status(403).json({
                error: 1, 
                message: "Unauthorized: Cannot perform action." 
            })
        }
        await Posts.deleteOne({ _id: post_id });
        await PostCounter.delete({postId: post_id})
        // Return success message
        return res.status(200).json({
            error: 0, 
            message: "Post deleted successfully" 
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ 
            error: 1,
            message: "Internal Server Error" 
        });
    }
}

module.exports = deletePost;