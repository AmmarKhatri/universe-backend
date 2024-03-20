const Community = require("../../models/Community");

async function joinCommunity(req, res) {
    try {
        const { id } = req.user; // Assuming this is the user's ID
        const comm_id = req.params.id; // The community's ID that the user wants to join
        
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: comm_id },
            { 
                $addToSet: { participants: id }, 
                $set: { updatedAt: Date.now() } 
            },
            { new: true } // Returns the document after update was applied
        );

        // Check if the user was actually added
        if (!updatedCommunity) {
            return res.status(404).json({
                error: 1,
                message: "Community not found"
            });
        }

        return res.status(200).json({
            error: 0,
            message: "Successfully joined the community",
        });

    } catch (error) {
        console.error("Error joining community:", error);
        return res.status(500).json({
            error: 1,
            message: "Internal Server Error"
        });
    }
}

module.exports = joinCommunity;
