const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    seeds: [{
        name: String,
        quantity: Number
    }]
})

module.exports = mongoose.model("User", userSchema)