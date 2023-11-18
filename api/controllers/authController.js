const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function register(request, reply) {
  try {
    const { username, email, password } = request.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      reply.status(400).send({ message: 'Email already exists' })
      return
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = generateToken(newUser._id)

    reply.status(201).send({ message: 'User registered successfully', token })
  } catch (error) {
    reply.status(500).send({ message: 'Error in registering user', error })
  }
}

async function login(request, reply) {
  try {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      reply.status(404).send({ message: 'User not found' })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      reply.status(401).send({ message: 'Password is incorrect' })
      return
    }

    const token = generateToken(user._id)

    reply.send({ message: 'User logged in successfully', token })
  } catch (error) {
    reply.status(500).send({ message: 'Error in logging in user', error })
  }
}

function logout(request, reply) {
  try {
    const token = request.headers.authorization

    const tokenParts = token.split(' ')
    const tokenValue = tokenParts[1]

    jwt.verify(tokenValue, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        reply.send({ message: 'User logged out' })
      } else {
        const invalidatedToken = jwt.sign(
          { userId: decoded.userId },
          process.env.SECRET_KEY,
          { expiresIn: 0 }
        )

        reply.send({ message: 'User logged out' })
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Error in logging out user', error })
  }
}

function generateToken(userId) {
  const payload = {
    userId,
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })

  return token
}

module.exports = {
  register,
  login,
  logout,
}
