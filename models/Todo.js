const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    category: { type: String, enum : [ 'study', 'fit', 'work', 'hobbies'] }, // todo: category must be a type
    isDone: Boolean,
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
})

todoSchema.path('category').options.enum
mongoose.model('Todo', todoSchema)