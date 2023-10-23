require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy


const app = express()
const port = process.env.DB_PORT || 8000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
const jwt = require('jsonwebtoken')

mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.1ix928u.mongodb.net/`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('MongoDB is connected My Friend')
}).catch(err => {
    console.log("Error in connecting to MongoDB", err)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})