var seeder = require('mongoose-seed')


// connect to mongo db via mongoose
seeder.connect('mongodb://localhost/mytodofarm', () => {
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