const Users = require("../../models/User");

async function deleteUser(req, res) {
    try {
        const { email } = req.user;

        // Find the user by email and delete it
        const deletedUser = await Users.findOneAndDelete({ email });

        // If user is not found
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Return success message
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
}

module.exports = deleteUser;