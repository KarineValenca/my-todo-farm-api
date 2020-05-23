const express = require('express')
const router = express.Router()

const userControler = require('../controllers/user')

router.get('/users', userControler.index)
router.post('/users', userControler.create)

module.exports = router