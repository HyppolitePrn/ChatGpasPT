require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy


const app = express()
const port = process.env.DB_PORT || 8000
const cors = require('cors')
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

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

app.listen(port, process.env.PRIVATE_IP, () => {
    console.log(`Server is running on port ${port}`)
})

const User = require('./models/User')
const Message = require('./models/Message')

app.post('/register', (req, res) => {
    const { username, email, password } = req.body

    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        newUser.save().then(user => {
            res.status(200).json({ message: 'User created successfully' })
        }).catch(err => {
            console.log('Error in creating user', err)
            res.status(500).json({ message: 'Error in creating user' })
        })
    })
})

const userToken = (userId) => {
    const payload = {
        userId
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })

    return token
}

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ message: 'Email and password are required' })
    }

    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Password is incorrect' })
        }

        const token = userToken(user._id)

        res.status(200).json({ message: 'User logged in successfully', token: token })
    }).catch(err => {
        console.log('Error in logging in user', err)
        res.status(500).json({ message: 'Error in logging in user' })
    })
})