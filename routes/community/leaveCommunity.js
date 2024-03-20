const Community = require("../../models/Community");

async function leaveCommunity(req, res) {
    try {
        const { id } = req.user; 
        const comm_id = req.params.id; 
        
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: comm_id },
            {
                $pull: { moderators: id }, //leave as moderator
                $pull: { participants: id }, //leave as participant
                $set: { updatedAt: Date.now() } 
            },
            { new: true } // Returns the document after update was applied
        );

        if (!updatedCommunity) {
            return res.status(404).json({
                error: 1,
                message: "Community not found"
            });
        }
        
        return res.status(200).json({
            error: 0,
            message: "Successfully left the community",
            community: updatedCommunity // Optionally return the updated community object
        });

    } catch (error) {
        console.error("Error leaving community:", error);
        return res.status(500).json({
            error: 1,
            message: "Internal Server Error"
        });
    }
}

module.exports = leaveCommunity;
