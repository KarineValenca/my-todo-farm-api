const express = require('express')
const passport = require("passport")
const router = express.Router()

const userControler = require('../controllers/user')

router.get('/users', userControler.index)
router.post('/users', userControler.create)
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/todos',
        failureRedirect: '/login'
    }), 
    (req, res) => {
    res.status(200)
    res.send('/')
})

module.exports = router