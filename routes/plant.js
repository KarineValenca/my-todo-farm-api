const express = require('express')
const router = express.Router()

const plantsController = require('../controllers/plant')

router.get("/plants", plantsController.index)
router.get("/plants/:user_id", plantsController.show)
router.post("/plants/:user_id", plantsController.create)

module.exports = router