const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const index = async(req, res) => {
    const users = await User.find({})
    res.status(200)
    res.send(users)
}

const create = async (req, res) => {
    const { username, password, email } = req.body
    if (!username || !password || !email ) {
        return res.status(400).send({error: 'You must provide a username, a password and an email'})
    }

    try{
        const user = new User({username, password, email})
        await user.save()
        res.status(200)
        res.send(user)
    }catch(err) {
        return req.status(400).send({ error: err })
    }
}


module.exports = {
    index, create
}