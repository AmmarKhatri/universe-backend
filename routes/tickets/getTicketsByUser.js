const Tickets = require("../../models/Ticket")
const Users = require("../../models/User")
async function getTicketsByUser (req, res) {
    try {
        const { email } = req.user
        let user = await Users.findOne({ email }).select('-password -__v -_id').populate('tickets');
        //user doesnt exist
        if (!user) return res.json({ message: "User doesn't exist!" })
        return res.json(user)
    } catch (error) {
        return res.json({ msg: error })
    }
};

module.exports = getTicketsByUser;