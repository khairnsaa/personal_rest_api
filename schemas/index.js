require('dotenv').config()
const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/nisaas_voyage_blog', {useNewURLParser: true}).catch(err => console.log(err))

    const db = mongoose.connection
    db.on('error', (err) => console.log(err))
    db.once('open', () => console.log('connected to db'))
}

module.exports = connect
