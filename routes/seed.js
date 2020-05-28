const express = require('express')
const router = express.Router()

const seedsController = require('../controllers/seed')

router.get("/seeds/:user_id", seedsController.show)

module.exports = router