const express = require('express')

module.exports = {
    new: newBid 
}


function newBid (req, res) {
    console.log('made it into the bid controller fine')
    res.redirect('/profile')
}