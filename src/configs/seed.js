var seeder = require('mongoose-seed')
const USERDB = process.env.USERDB
const PASSDB = process.env.PASSDB

const uri = `mongodb+srv://${USERDB}:${PASSDB}@cluster0.azzir.mongodb.net/my-todo-farm?retryWrites=true&w=majority`
//const uri = 'mongodb://localhost/mytodofarm'
// connect to mongo db via mongoose
seeder.connect(uri, () => {
    //load mongoose models
    seeder.loadModels([
        './models/Seed.js'
    ])

    // clear specified collections
    seeder.clearModels(['Seed'], () => {
        // populate db once collections have bee cleared
        seeder.populateModels(data, (err, done) => {
            seeder.disconnect()
        })
    })
})

var data = [
    {
        'model': 'Seed',
        'documents': [
            {
                'name': 'Wheat',
                'rarity': 0.7
            },
            {
                'name': 'Rice',
                'rarity': 0.2
            },
            {
                'name': 'Rose',
                'rarity': 0.1
            }
        ]
    }
]