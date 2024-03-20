const Users = require("../../models/User");

async function deleteUser(req, res) {
    try {
        const { email, role } = req.user;
        //if there is a userID present, only admin can delete
        if (req.body.id){ 
            //fetch user
            const user = await Users.findOne({ _id: req.body.id }).select('-password -__v -_id')
            if (!user){
                return res.status(404).json({
                    error: 1,
                    message: "User Not Found"
                })
            }
            if(role == 'SUPERADMIN'){
                await Users.findOneAndDelete({ email });
                return res.status(200).json({ 
                    error:0,
                    message: "User deleted successfully" 
                });
            } else if (role == 'ADMIN' && (user.role != 'ADMIN' || user.role != 'SUPERADMIN')) {
                await Users.findOneAndDelete({ email });
                return res.status(200).json({ 
                    error:0,
                    message: "User deleted successfully" 
                });
            } else {
                return res.status(401).json({ 
                    error:1,
                    message: "Unauthorized: Cannot delete user" 
                });
            }
        } else {
            // Find the user by email and delete it
            const deletedUser = await Users.findOneAndDelete({ email });

            // If user is not found
            if (!deletedUser) {
                return res.status(404).json({ 
                    error: 1,
                    message: "User not found" 
                });
            }

            // Return success message
            return res.status(200).json({
                error: 0, 
                message: "User deleted successfully" 
            });
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({ 
            error: 1,
            message: error 
        });
    }
}

module.exports = deleteUser;