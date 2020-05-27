const express = require('express')
const mongoose = require('mongoose')

const Seed = mongoose.model('Seed')
const User = mongoose.model('User')

const index = async(req, res) => {
    const { user_id } = req.params
    User.findById(user_id, (err, user) => {
        if (err) {
            return res.status(404).send({error: 'User not fount'})
        }
        res.send(user.seeds)
    })
}

const giveSeed = async (user_id) => {
    // todo maybe use a find method inside user controller
    User.findById(user_id, (err, user) => {
        if (err) {
           console.log(err)
           return 
        }
        try {
            Seed.find({}, (err, seeds) => {
                if (err) {
                    return res.status(400).send({error: 'Could not found seed'})
                }
                const randomSeed = seeds[Math.floor(Math.random() * seeds.length)]
                found = user.seeds.find(seed => seed.name === randomSeed.name)
                if (found == undefined) {
                    const userSeed = {}
                    userSeed.name = randomSeed.name
                    userSeed.quantity = 1

                    user.seeds.push(userSeed)
                    user.save()
                } else {
                    User.findOneAndUpdate(
                        { _id: user._id, "seeds.name": found.name }, 
                        { "$set": {
                            "seeds.$.quantity": found.quantity + 1 }
                        }, 
                    (err, user) => {
                        if (err) console.log(err)
                    }) 
                }
            })
        }catch(err){
            console.log(err)
        }
        
    })
}
module.exports = {
    giveSeed, index
}