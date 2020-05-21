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
        return res.status(400).send({error: 'You must provide a title and a category'})
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

router.put('/todos/:_id', async(req, res) => {
    const id = req.params._id
    const { title, category } = req.body
    if (!title || !category ) {
        return res.status(400).send({error: 'You must provide a title and a category'})
    }
    try {
        Todo.findById(id, async(err, todo) => {
            if (err) {
                return res.status(400).send({error: 'Could not found id'})
            }
            todo.title = title
            todo.category = category
            await todo.save()
            res.status(200)
            res.send(todo)
        })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.delete('/todos/:_id', (req, res) => {
    const id = req.params._id
    if (!id) {
        return res.status(400).send({error: 'Could not found id'})
    }

   
    Todo.findByIdAndRemove(id, (err) => {
        if (err) {
            return res.status(400).send({error: 'Could not found id'})
        }
        res.status(200)
        res.send("To-Do deleted")
    })
    
})

router.put('/change-todo-status/:_id', async(req, res) => {
    const id = req.params._id
    if (!id) {
        return res.status(400).send({error: 'Could not found id'})
    }
    
    try {
        Todo.findById(id, async(err, todo) => {
            if (err) {
                return res.status(400).send({error: 'Could not found id'})
            }
            todo.isDone = !todo.isDone
            await todo.save()
            res.status(200)
            res.send(todo)
        })
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
})

module.exports = router