const User = require("../../models/User");

async function updateUserRole(req, res) {
    try {
        console.log("Update user role")
        const { id, role: userRole } = req.user
        const role = req.body.role;
        const email = req.body.email;

        if (userRole != 'SUPERADMIN') {
            return res.status(403).json({
                error: 1,
                message: "Unauthorized to update user role"
            })
        }

        console.log("Updating user role:", email, role)
        const user = await User.findOne({
            email
        });

        console.log("User found:", user);

        if (!user) return res.status(404).json({
            error: 1,
            message: "User Not Found"
        });

        // update user role
        user.role = role;
        await user.save();
        return res.status(200).json({
            error: 0,
            message: "Updated user role successfully",
            user
        });
    }
    catch (error) {
        console.error("Update user role error:", error);
        return res.status(500).json({
            error: 1,
            message: "Could not update user role"
        });
    }
}

module.exports = updateUserRole;