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
    const { title, category } = req.body
    if (!title || !category ) {
        return res.status(422).send({error: 'You must provide a title and a category'})
    }
    try {
        const todo = new Todo({ title, category, isDone: false })
        await todo.save()
        res.status(200)
        res.send(todo)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.put('/complete-todo/:_id', async(req, res) => {
    const id = req.params._id
    if (!id) {
        return res.status(404).send({error: 'Could not found id'})
    }
    
    Todo.findById(id, async(err, todo) => {
        if (err) {
            return res.status(404).send({error: 'Could not found id'})
        }
        res.status(200)
        todo.isDone = true
        await todo.save()
        res.send(todo)
    })
        
   
})

module.exports = router