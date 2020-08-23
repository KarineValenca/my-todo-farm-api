require('./models/Todo')
const User = require('./models/User')
require('./models/Seed')
require('./models/Plant')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const seedRoutes = require('./routes/seed')
const plantRoutes = require('./routes/plant')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser')

const USERDB = process.env.USERDB
const PASSDB = process.env.PASSDB

// MongoAtlas Connection
const uri = `mongodb+srv://${USERDB}:${PASSDB}@cluster0.azzir.mongodb.net/my-todo-farm?retryWrites=true&w=majority`
// Local DB connection
//const uri = 'mongodb://localhost/mytodofarm'

const setPlantDry = require('./jobs/setPlantsDry')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(todoRoutes)
app.use(userRoutes)
app.use(authRoutes)
app.use(seedRoutes)
app.use(plantRoutes)
mongoose.connect(uri, {useNewUrlParser: true})

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

module.exports = app