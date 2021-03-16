const Proposal = require('../models/proposal')
const Bid = require('../models/bid')
const { signedCookie } = require('cookie-parser')

module.exports = {
    index
}

async function index (req, res, next) {
  try {
    const proposals = await Proposal.find({})
    const bids = await Bid.find({})
    if (bids.length > 20) bids.slice(0, 20)
    res.render('index', { name: 'Stranger', proposals })
  } catch (err) {
    res.send(err)
  }
}