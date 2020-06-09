const express = require('express')
const mongoose = require('mongoose')

const Todo = mongoose.model('Todo')
const User = mongoose.model('User')
const seedsController = require('../controllers/seed')

const show = async(req, res) => {
    const { user_id } = req.params
    if (!user_id) {
        return res.status(422).send({ error: 'Cound not find user' })
    }
    const user = await User.findById(user_id).populate("todos")
    
    if (!user) {
        return res.status(433).send({ error: 'Cound not find user' })
    }

    res.status(200)
    res.send(user.todos)
    
}

const create = async(req, res) => {
    const { title, category } = req.body
    const { user_id } = req.params
    if (!user_id) {
        return res.status(422).send({error: 'Invalid user'})
    }
    
    if (!title || !category) {
        return res.status(422).send({error: 'You must provide a title and a category'})
    }

    User.findById(user_id, async(err, user) => {
        

        if (err) {
            return res.status(400).send({error: 'Could not find user'})
        }

        try {
            const todo = new Todo({ title, category, isDone: false })
            todo.user._id = user._id
            await todo.save()
            try {
                await User.update(
                    { '_id': user._id }, 
                    { '$push': { todos: todo } }
                )
                res.status(200)
                res.send(todo)
            }catch(err) {
                console.log(err)
            }

            
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    })
    
}

const update = async(req, res) => {
    const id = req.params._id
    const { title, category } = req.body
    
    
    if (!title || !category ) {
        return res.status(422).send({error: 'You must provide a title and a category'})
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
        return res.status(422).send({error: 'Could not found id'})
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
        return res.status(422).send({error: 'Could not found id'})
    }
    
    try {
        Todo.findById(id, async(err, todo) => {
            if (err) {
                return res.status(400).send({error: 'Could not found id'})
            }
            todo.isDone = !todo.isDone
            seedsController.giveSeed(todo.user._id)
            await todo.save()
            
            res.status(200)
            res.send(todo)
        })
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
}

module.exports = {
    show, create, update, remove, updateStatus
}