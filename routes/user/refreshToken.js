const bcrypt = require("bcrypt");
const Users = require("../../models/User");
const jwt = require("jsonwebtoken")
async function refreshToken(req, res){
    try {
        const {email, role} = req.user;
        //creating an access token
        const access_token = jwt.sign({
            email,
            createdAt: new Date(),
            role,
            refresh: false
        }, process.env.JWTSECRET, { expiresIn: "7d" });
        res.json({
            error: 0, 
            access_token
        })
    } catch (error) {
        console.error(error)
    }
};

module.exports = refreshToken