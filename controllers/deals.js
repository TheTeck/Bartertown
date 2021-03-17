const Bid = require('../models/bid')
const Proposal = require('../models/proposal')

module.exports = {
    new: newDeal
}


async function newDeal (req, res) {
    try {
        const bid = await Bid.findById(req.params.id)
        const proposal = await Proposal.findById(bid.parentProposal)
        res.render('deals/new', { bid, proposal })
    } catch (err) {
        res.send(err)
    }   
}