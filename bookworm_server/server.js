const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const PORT = 3003
const bookwormController = require('./controllers/bookworm.js')

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))



mongoose.connect('mongodb://localhost:27017/holidays', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})


app.use(express.json());
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))


app.use('/bookworm', bookwormController)

app.listen(PORT, () =>{
    console.log("Listening on port: ", PORT)
})