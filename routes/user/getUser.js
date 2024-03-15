const Users = require("../../models/User");

async function getUser(req, res) {
    try {
        const { email } = req.user
        const user = await Users.findOne({ email }).select('-password -__v -_id')
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        return res.status(200).json(user)
    }catch(error){
        console.error(error)
        return res.status(500).json({error})
    }
}

module.exports = getUser;