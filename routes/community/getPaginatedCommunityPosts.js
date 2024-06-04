const Community = require("../../models/Community");
const Posts = require("../../models/Post");

async function getPaginatedCommunityPosts(req, res) {
    try {
        const comm_id = req.params.id;
        const { id, role } = req.user;
        const limit = parseInt(req.query.limit) || 5; // default limit
        const offset = parseInt(req.query.offset) || 0; // default offset

        // Check if the user is part of the community
        const community = await Community.findOne({ _id: comm_id });
        if (!community) {
            return res.status(404).json({ 
                error: 1, 
                message: "Community not found" 
            });
        }

        // Check if the user has permission to view posts
        if (!(role === 'ADMIN' || role === 'SUPERADMIN' || community.participants.includes(id))) {
            return res.status(403).json({ 
                error: 1, 
                message: "Unauthorized: Cannot view post." 
            });
        }

        const posts = await Posts.find({ community: comm_id })
                            .populate({
                                path: "createdBy",
                                select: "_id username"
                            })
                            .sort({updatedAt: -1})
                            .skip(offset)
                            .limit(limit);

        const totalRecords = await Posts.countDocuments({ community: comm_id });

        // Return paginated posts
        return res.status(200).json({
            error: 0,
            message: "Posts fetched successfully",
            pagination: {
                page: offset / limit,
                records_per_page: limit,
                total_records: totalRecords,
                total_pages: Math.ceil(totalRecords / limit)
            },
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 1, 
            message: "Internal Server Error" 
        });
    }
}

module.exports = getPaginatedCommunityPosts;
