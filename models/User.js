const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ],
    seeds: [{
        name: String,
        quantity: Number
    }],
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }]
})

module.exports = mongoose.model("User", userSchema)