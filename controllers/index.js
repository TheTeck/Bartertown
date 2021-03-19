const Proposal = require('../models/proposal')
const Bid = require('../models/bid')

module.exports = {
    index
}

async function index (req, res, next) {
  // Just show all of the trades available
  try {
    const proposals = await Proposal.find({})
    console.log(proposals.length)
    res.render('index', { proposals })
  } catch (err) {
    res.send(err)
  }
}