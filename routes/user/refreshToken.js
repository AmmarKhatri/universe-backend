const bcrypt = require("bcrypt");
const Users = require("../../models/User");
const jwt = require("jsonwebtoken")
async function refreshToken(req, res){
    try {
        const {email,id, role} = req.user;
        //creating an access token
        const access_token = jwt.sign({
            id,
            email,
            createdAt: new Date(),
            role,
            refresh: false
        }, process.env.JWTSECRET, { expiresIn: "7d" });
        return res.status(200).json({
            error: 0, 
            access_token
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 1, 
            message: "Internal Server Error"
        })
    }
};

module.exports = refreshToken