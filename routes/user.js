const express = require('express')
const router = express.Router()

const userControler = require('../controllers/user')

router.get('/users', userControler.index)

module.exports = router