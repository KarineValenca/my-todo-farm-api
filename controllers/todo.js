const express = require('express')
const mongoose = require('mongoose')

const Todo = mongoose.model('Todo')

const index = async(req, res) => {
    const todos = await Todo.find({})
    res.status(200)
    res.send(todos)
}

const create = async(req, res) => {
    console.log("method called")
    const { title, category } = req.body
    console.log(req.body)
    console.log(category)
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
}

const update = async(req, res) => {
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
            todo.isDone = false
            await todo.save()
            res.status(200)
            res.send(todo)
        })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

const remove = async(req, res) => {
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
}

const updateStatus = (req, res) => {
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
}

module.exports = {
    index, create, update, remove, updateStatus
}