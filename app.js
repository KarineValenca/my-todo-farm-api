require('./models/Todo')
require('./models/User')
const express = require('express')
const app = express()
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(todoRoutes)
app.use(userRoutes)
mongoose.connect('mongodb://localhost/mytodofarm', {useNewUrlParser: true})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.log('Erro connecting to mongo', err)
})


app.get('/', (req, res) => {
    res.send('My todo farm')
})

app.listen(3000, () => {
    console.log("App listening on port 3000")
})