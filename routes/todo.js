const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Todo = mongoose.model('Todo')

router.get('/todos', async(req, res) => {
    const todos = await Todo.find({})
    res.status(200)
    res.send(todos)
})

router.post('/todos', async(req, res) => {
    console.log(req.body)
    const { title, category } = req.body
    if (!title || !category ) {
        return res.status(422).send({error: 'You must provide a title and a category'})
    }
    try {
        const todo = new Todo({ title, category})
        await todo.save()
        res.send(todo)
    } catch {
        res.status(422).send({ error: err.message })
    }
})


module.exports = router