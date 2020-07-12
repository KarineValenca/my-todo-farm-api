var mongoose = require('mongoose')

var seedSchema = new mongoose.Schema({
    name: String,
    rarity: Number
})

module.exports = mongoose.model("Seed", seedSchema)