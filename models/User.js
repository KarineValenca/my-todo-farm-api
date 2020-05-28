const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
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

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)