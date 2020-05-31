const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const index = async(req, res) => {
    const users = await User.find({})
    res.status(200)
    res.send(users)
}

module.exports = {
    index,
}