const express = require('express')
const mongoose = require('mongoose')

const Seed = mongoose.model('Seed')
const User = mongoose.model('User')

const show = async(req, res) => {
    const { user_id } = req.params
    User.findById(user_id, (err, user) => {
        if (err) {
            return res.status(404).send({error: 'User not found'})
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
            Seed.find({}, async (err, seeds) => {
                if (err) {
                    return res.status(400).send({error: 'Could not found seed'})
                }
                const randomSeed = randomizeSeed(seeds)
                found = user.seeds.find(seed => seed.name === randomSeed.name)
                if (found == undefined) {
                    const userSeed = {}
                    userSeed.name = randomSeed.name
                    userSeed.quantity = 1

                    await User.update(
                        { '_id': user._id }, 
                        { '$push': { seeds: userSeed } }
                    )
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

// the sum of the weights must be equal to 1
const randomizeSeed = (seeds) => {
    let i = 0, sum = 0, r = Math.random()
    for (i in seeds) {
        sum += seeds[i].rarity
        if (r <= sum) return seeds[i]
    }
}

module.exports = {
    giveSeed, show
}