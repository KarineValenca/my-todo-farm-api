const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    category: String, // todo: category must be a type
    isDone: Boolean,
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
})

mongoose.model('Todo', todoSchema)