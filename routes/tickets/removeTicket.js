const Tickets = require("../../models/Ticket")
const Users = require("../../models/User")
async function removeTicket (req, res) {
    try {
        const { email } = req.user
        let user = await Users.findOne({ email })
        //user doesnt exist
        if (!user) return res.json({ message: "User doesn't exist!" })
        const ticket = await Tickets.findOneAndDelete({ _id: req.params.id });
        user.tickets.pop(ticket._id); // Push ticket reference inside user doc
        // Save the updated user document
        await user.save();
        return res.json({ msg: "DELETED" })
    } catch (error) {
        return res.json({ msg: error })
    }
};

module.exports = removeTicket;