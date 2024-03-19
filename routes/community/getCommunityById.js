const Community = require("../../models/Community");

async function getCommunityById(req, res) {
    try {
        const { id } = req.body
        const community = await Community.findOne({ id }).populate('Users')
        if (!user) return res.status(404).json({
            error: 1, 
            message: "Community not found" 
        })
        return res.status(200).json({
            error: 0,
            message: "Community fetched successfully",
            community
        })
    }catch(error){
        console.error("Community fetch error:", error);
        return res.status(500).json({
            error:1,
            message: "Internal Server Error"
        })
    }
}

module.exports = getCommunityById;