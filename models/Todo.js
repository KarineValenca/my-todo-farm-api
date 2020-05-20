const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    category: String // todo: category must be a type
})

mongoose.model('Todo', todoSchema)