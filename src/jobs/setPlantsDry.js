const cron = require('node-cron')
const plantsController = require('../controllers/plant')

const task = cron.schedule('1 0 * * *', () => {
    console.log("Called job to set set plants to dry...")
    plantsController.setPlantThirst()
})

module.exports = task