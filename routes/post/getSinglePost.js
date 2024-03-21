const Community = require("../../models/Community");
const Posts = require("../../models/Post");

async function getSinglePost(req, res) {
    try {
        const post_id = req.params.id;
        const { id, role } = req.user;
        //if there is a userID present, only admin can delete
        const post = await Posts.findOne({ _id: post_id });
        // If user is not found
        if (!post) {
            return res.status(404).json({ 
                error: 1,
                message: "Post not found" 
            });
        }
        //check if user part of community
        const community = await Community.findOne({ _id: post.community });
        //owner - moderators - admin - superadmins only delete
        if (!(role == 'ADMIN' || role == 'SUPERADMIN' || community.participants.includes(id))){
            return res.status(403).json({
                error: 1, 
                message: "Unauthorized: Cannot view post." 
            })
        }
        // Return success message
        return res.status(200).json({
            error: 0, 
            message: "Post fetched successfully",
            post 
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ 
            error: 1,
            message: "Internal Server Error" 
        });
    }
}

module.exports = getSinglePost;