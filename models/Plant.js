var mongoose = require('mongoose')

var plantSchema = new mongoose.Schema({
    age: Date,
    status: String,
    seedName: String
})

module.exports = mongoose.model("Plant", plantSchema)