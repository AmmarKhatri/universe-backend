const Tickets = require("../../models/Ticket")
const Users = require("../../models/User")
async function createTicket (req, res) {
    try {
        const { email } = req.user
        let user = await Users.findOne({ email })
        //user doesnt exist
        if (!user) return res.json({ message: "User doesn't exist!" })
        const ticket = await Tickets.create({ ...req.body, userId: user._id});
        user.tickets.push(ticket._id); // Push ticket reference inside user doc
        // Save the updated user document
        await user.save();
        return res.json({ msg: "CREATED" })
    } catch (error) {
        return res.json({ msg: error })
    }
};

module.exports = createTicket;