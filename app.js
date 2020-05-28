require('./models/Todo')
const User = require('./models/User')
require('./models/Seed')
require('./models/Plant')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const seedRoutes = require('./routes/seed')
const plantRoutes = require('./routes/plant')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport configs
app.use(require("express-session")({
    secret: "Top secret", // todo: change to env variable
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(todoRoutes)
app.use(userRoutes)
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

app.listen(3000, () => {
    console.log("App listening on port 3000")
})