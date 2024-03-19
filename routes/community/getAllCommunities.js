const Community = require("../../models/Community");

async function getAllCommunities(req, res) {
    try {
        const { id } = req.body
        const communities = await Community.findAll()
        if (communities.length != 0) return res.status(404).json({
            error: 1, 
            message: "No communities to show" 
        })
        return res.status(200).json({
            error: 0,
            message: "Community fetched successfully",
            community
        })
    } catch(error) {
        console.error("Community fetch error:", error);
        return res.status(500).json({
            error:1,
            message: "Internal Server Error"
        })
    }
}

module.exports = getAllCommunities;