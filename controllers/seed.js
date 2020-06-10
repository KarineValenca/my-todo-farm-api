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
                const randomSeed = seeds[Math.floor(Math.random() * seeds.length)]
                found = user.seeds.find(seed => seed.name === randomSeed.name)
                console.log(found)
                if (found == undefined) {
                    console.log("entrou no undefined")
                    console.log(user)
                    const userSeed = {}
                    userSeed.name = randomSeed.name
                    userSeed.quantity = 1

                    //user.seeds.push(userSeed)
                    //await user.save()
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
module.exports = {
    giveSeed, show
}