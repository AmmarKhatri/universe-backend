const Users = require("../../models/User");

async function getUser(req, res) {
    try {
        const { email } = req.user
        const user = await Users.findOne({ email }).select('-password -__v -_id')
        if (!user) return res.status(404).json({
            error: 1,
            message: "User Not Found" 
        })
        return res.status(200).json({
            error: 0,
            message: "User fetched successfully",
            user
        })
    }catch(error){
        console.error("Fetch user error:", error);
        return res.status(500).json({
            error:1,
            message: "Internal Server Error"
        })
    }
}

module.exports = getUser;