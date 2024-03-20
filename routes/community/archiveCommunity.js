const Community = require("../../models/Community");

async function archiveCommunity(req, res) {
    try {
        // Check if the user has the SUPERADMIN role
        if (req.user.role !== 'SUPERADMIN') {
            return res.status(403).json({
                error: 1,
                message: "Unauthorized: Only SUPERADMINs can archive communities."
            });
        }

        const comm_id = req.params.id; // The community's ID to be archived

        // Use findOneAndUpdate to set the isArchived flag to true
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: comm_id },
            { 
                $set: { isArchived: true, updatedAt: Date.now() }
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
            message: "Community successfully archived",
            community: updatedCommunity
        });

    } catch (error) {
        console.error("Error archiving community:", error);
        return res.status(500).json({
            error: 1,
            message: "Internal Server Error"
        });
    }
}

module.exports = archiveCommunity;
