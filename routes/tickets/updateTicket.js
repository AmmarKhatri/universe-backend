const Tickets = require("../../models/Ticket");

async function updateTicket(req,res) {
    try{
        const ticket = Tickets.findOne({_id: req.params.id})
        if(!ticket) return res.status(404).json({msg: "Ticket not valid!"})
        ticket.type = req.body.type;
        ticket.updatedAt = Date.now()
        await ticket.save();
        return res.status(200).json({msg: "Ticket type updated"})
    }catch(error){
        return res.status(500).json({error})
    }
}

module.exports = updateTicket;