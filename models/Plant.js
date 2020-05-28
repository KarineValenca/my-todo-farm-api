var mongoose = require('mongoose')

var plantSchema = new mongoose.Schema({
    age: Date,
    status: String,
    seed: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User.seeds"
        }
    }
})

module.exports = mongoose.model("Plant", plantSchema)