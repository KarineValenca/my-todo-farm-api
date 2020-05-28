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
        found = user.seeds.find(seed => seed._id == seed_id)
        if (found === undefined) {
            return res.status(404).send({error: "Seed not found"})
        }

        if (found.quantity <= 0) {
            return res.status(400).send({error: "You don't have enough seeds to plant"})
        }

        const plant = new Plant({age: Date.now(), status: "Healthy" })
        plant.seed._id = seed_id
        await plant.save()

        found.quantity -= 1
        user.plants.push(plant)
        user.save()
        res.status(200)
        res.send(plant)
    })
}

module.exports = {
    index, create, show
}