const bcrypt = require("bcrypt");
const Users = require("../../models/User");

async function registerUser (req, res) {
    try {
        const { email, password } = req.body

        let user = await Users.findOne({ email })
        console.log("User =>", user)
        if (user) return res.json({ message: "User already created!" })
        if (password.length < 8) return res.json({ message: "Password must be atleast 8 characters." })
        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) }); //5 salt rounds

        return res.json({ msg: "CREATED" })
    } catch (error) {
        return res.json({ msg: error })
    }
};

module.exports = registerUser;