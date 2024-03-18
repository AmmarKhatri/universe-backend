const bcrypt = require("bcrypt");
const Users = require("../../models/User");
const jwt = require("jsonwebtoken")
async function loginUser(req, res){
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.json({ 
            error: 1,
            message: "User Not Found"
        })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ 
            error: 1,
            message: "Invalid Password" 
        })
        //creating an access token
        const access_token = jwt.sign({
            email,
            createdAt: new Date(),
            role: user.role,
            refresh: false
        }, process.env.JWTSECRET, { expiresIn: "7d" });
        //creating a refresh token
        const refresh_token = jwt.sign({
            email,
            createdAt: new Date(),
            role: user.role,
            refresh: true
        }, process.env.JWTSECRET, { expiresIn: "30d" });
        res.json({
            error: 0, 
            access_token,
            refresh_token
        })
    } catch (error) {
        console.error(error)
    }
};

module.exports = loginUser