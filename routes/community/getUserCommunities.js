const Community = require("../../models/Community");

async function getUserCommunities(req, res) {
    try {
        const { id } = req.user; // Assuming this is the user's ID
        const communities = await Community.find({ participants: id });
        if (communities.length === 0) {
            return res.status(404).json({
                error: 1,
                message: "No communities to show"
            });
        }
        return res.status(200).json({
            error: 0,
            message: "Community fetched successfully",
            communities
        });
    } catch (error) {
        console.error("Community fetch error:", error);
        return res.status(500).json({
            error: 1,
            message: "Internal Server Error"
        });
    }
}

module.exports = getUserCommunities;
