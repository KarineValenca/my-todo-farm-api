var mongoose = require('mongoose')

var seedSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("Seed", seedSchema)