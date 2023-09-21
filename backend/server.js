require('dotenv').config();
const express = require('express')
const moongose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

//connect to DB
moongose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB & Listening to PORT', process.env.PORT);
    }) 
})
.catch((error)=> {
    console.log(error);
})