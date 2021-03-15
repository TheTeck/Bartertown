const Proposal = require('../models/proposal')

module.exports = {
    index
}

async function index (req, res, next) {
  const proposals = await Proposal.find({})
  res.render('index', { name: 'Stranger', proposals })
}