const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')
const secret = 'TODOCHANGEKEY'

const signup = async(req, res) => {
    const { email, password, username } = req.body

    try {
        const user = new User({ email, password, username })
        await user.save()
        const token = jwt.sign({ userId: user._id }, secret)
        res.status(200)
        res.send({ token, user })
    }catch(err){
        return res.status(422).send(err.message)
    }
}

const signin = async(req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' })
    }
    const user = await User.findOne({ email })
   
    if (!user) {
        return res.status(422).send({ error: 'Invalid email or password' })
    }

    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id}, secret)
        res.send({ token, user })
    }catch(err) {
        console.log(err)
        return res.status(422).send({ error: 'Invalid email or password' })
    }
}

module.exports = {
    signin, signup
}