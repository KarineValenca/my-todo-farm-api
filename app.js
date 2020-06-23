require('./models/Todo')
const User = require('./models/User')
require('./models/Seed')
require('./models/Plant')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cron = require('node-cron')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const seedRoutes = require('./routes/seed')
const plantRoutes = require('./routes/plant')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser')

const setPlantDry = require('./jobs/setPlantsDry')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(todoRoutes)
app.use(userRoutes)
app.use(authRoutes)
app.use(seedRoutes)
app.use(plantRoutes)
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

setPlantDry.start()

app.listen(3000, () => {
    console.log("App listening on port 3000")
})