const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todo')

router.get('/todos/:user_id', todoController.show)

router.post('/todos/:user_id', todoController.create)

router.put('/todos/:_id', todoController.update)

router.delete('/todos/:_id', todoController.remove)

router.put('/change-todo-status/:_id', todoController.updateStatus)

module.exports = router