const express = require('express')
const mongoose = require('mongoose')
var passport = require("passport")

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
        const user = new User()
        user.username = username
        user.email = email

        User.register(user, password, (err, user) => {
            if(err) {
                return res.status(400).send({error: err})
            }
            passport.authenticate("local")(req, res, () => {
                res.status(200)
                res.send(user)
            })
        })
        
    }catch(err) {
        return res.status(400).send({ error: err })
    }
}


module.exports = {
    index, create
}