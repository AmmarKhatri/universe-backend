const bcrypt = require("bcrypt");
const Users = require("../../models/User");

async function registerUser (req, res) {
    try {
        const { email, password } = req.body
        if (!req.body.role || req.body.role == 'SUPERADMIN' || req.body.role == 'ADMIN'){
            req.body.role = 'STUDENT' //default to student
        }
        let user = await Users.findOne({ email })
        console.log("User =>", user)
        if (user) return res.status(403).json({
            error: 1, 
            message: "User already created!" 
        })
        if (password.length < 8) return res.json({ message: "Password must be atleast 8 characters." })
        const createdUser = await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) }); //5 salt rounds

        return res.json({
            error: 0,
            message: "Created user successfully",
            user: createdUser
        })
    } catch (error) {
        console.log("Registeration error: ", error);
        return res.json({
            error: 1, 
            message: "User registeration failed" 
        })
    }
};

module.exports = registerUser;