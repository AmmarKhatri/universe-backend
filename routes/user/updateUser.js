const bcrypt = require('bcrypt');
const Users = require("../../models/User");

async function updateUser(req, res) {
    try {
        const { email } = req.user;

        // Hash the password if it's being updated
        if (req.body.password) {
            if(req.body.password.length < 8) return res.json({ message: "Password must be 8 characters atleast." })
            req.body.password = await bcrypt.hash(req.body.password, 5);
        }

        // Remove unchangable values && update date
        delete req.body.email;
        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ 
            error: 1,
            message: "User Not Found" 
        });

        // Update the user object with fields from the request body
        Object.assign(user, req.body);

        // Save the updated user object
        await user.save();

        // Return the updated user object
        return res.status(200).json({
            error: 0,
            message: "Updated user successfully",
            user
        });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ 
            error: 1,
            message: "Could not update user" 
        });
    }
}

module.exports = updateUser;
