const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true
    },
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

UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')){
        return next
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword){
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err){
                return reject(err)
            }

            if (!isMatch) {
                return reject(err)
            }
            resolve(true)
        })
    })
}

module.exports = mongoose.model("User", UserSchema).init()