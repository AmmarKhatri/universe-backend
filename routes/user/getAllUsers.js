const User = require("../../models/User");

async function getAllUsers(req, res) {
    try {
        const { id, role } = req.user
        if (role != 'SUPERADMIN') {
            return res.status(403).json({
                error: 1,
                message: "Unauthorized to view users"
            })
        }
        const users = await User.find()
        if (users.length == 0) return res.status(404).json({
            error: 1, 
            message: "No users to show" 
        })

        // filter out the user calling the API
        const filteredUsers = users.filter(user => user._id.toString() != id.toString())
        return res.status(200).json({
            error: 0,
            message: "User fetched successfully",
            users: filteredUsers
        })
    } catch(error) {
        console.error("User fetch error:", error);
        return res.status(500).json({
            error:1,
            message: "Internal Server Error"
        })
    }
}

module.exports = getAllUsers;