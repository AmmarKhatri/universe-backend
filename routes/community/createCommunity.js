const Communities= require("../../models/Community")
async function createCommunity (req, res) {
    try {
        const { id, role } = req.user
        if (role == 'SUPERADMIN' || role == 'ADMIN') {
            //only admins creates communities for now
            const community = await Communities.create({ ...req.body, 
                moderators: [id],
                participants: [id],
                createdBy: id
            });
            return res.status(201).json({ 
                error: 0,
                message: "Created Community Successfully" 
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 1, 
            message: "Internal Server Error"
        })
    }
};

module.exports = createCommunity;