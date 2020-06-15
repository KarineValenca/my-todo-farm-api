const express = require('express')
const mongoose = require('mongoose')

const Plant = mongoose.model('Plant')
const User = mongoose.model('User')

const index = async(req, res) => {
    const plants = await Plant.find({})
    res.status(200)
    res.send(plants)
}

const show = async(req, res) => {
    const { user_id } = req.params
    User.findById(user_id, (err, user) => {
        if (err) {
            return res.status(404).send({error: 'User not found'})
        }
        res.send(user.plants)
    })
}

const create = async(req, res) => {
    const { user_id } = req.params
    const { seed_id } = req.body

    if (!seed_id) {
        return res.status(400).send({error: "You must provide a seed"})
    }

    User.findById(user_id, async (err, user) => {
        if (err) {
            return res.status(404).send({error: 'User not found'})
        }

        //verify if seeds being planted is from user
        foundSeed = user.seeds.find(seed => seed._id == seed_id)
        if (foundSeed === undefined) {
            return res.status(404).send({error: "Seed not found"})
        }

        if (foundSeed.quantity <= 0) {
            return res.status(400).send({error: "You don't have enough seeds to plant"})
        }

        const plant = new Plant({age: Date.now(), status: "Healthy" })
        plant.seed._id = seed_id
        await plant.save()
        console.log(foundSeed.quantity)
        //foundSeed.quantity -= 1
        //user.plants.push(plant)
        //user.save()
        try{
            await User.update(
                { '_id': user._id }, 
                { '$push': { plants: plant } },
                
            )
            await User.findOneAndUpdate(
                { _id: user._id, "seeds.name": foundSeed.name }, 
                { "$set": {
                    "seeds.$.quantity": foundSeed.quantity - 1 }
                }
            )
        }catch(err){
            console.log(err)
        }
        res.status(200)
        res.send(plant)
    })
}

const irrigate = async(req, res) => {
    const { plant_id } = req.body

    if (!plant_id) {
        return res.status(400).send({error: "You must provide a plant"})
    }
    
    Plant.findById(plant_id, async (err, plant) => {
        if (err) {
            return res.status(404).send({error: "Plant not found"})
        }
        console.log(plant)
        plant.status = "Healthy"
        plant.save()
        res.status(200)
        res.send(plant)
    })
}

module.exports = {
    index, create, show, irrigate
}