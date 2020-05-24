const express = require('express')
const mongoose = require('mongoose')

const Seed = require('../models/Seed')

const generateRandomSeed = () => {
    Seed.find({}, (err, seeds) => {
        console.log(seeds)
    })
    
}
module.exports = {
    generateRandomSeed
}