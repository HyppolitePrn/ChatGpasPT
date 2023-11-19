const User = require('../models/User')
const Joi = require('joi')

async function createUser(request, reply) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            // Add more fields as necessary
        })

        const { error } = schema.validate(request.body)
        if (error) {
            return reply
                .status(400)
                .send({ message: 'Invalid user data', error: error.details })
        }

        const userData = request.body

        const user = new User(userData)
        await user.save()

        const userResponse = { ...user._doc }
        delete userResponse.password

        reply
            .code(201)
            .send({ message: 'User created successfully', user: userResponse })
    } catch (error) {
        if (error.code === 11000) {
            reply.status(400).send({ message: 'Email already exists' })
        } else {
            reply.status(500).send({ message: 'Error in creating user' })
        }
    }
}

async function getAllUsers(request, reply) {
    try {
        const { page = 1, limit = 10 } = request.query

        const users = await User.find({ _id: { $ne: request.user.id } })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        const count = await User.countDocuments()

        reply.send({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        // log the error
        reply.status(500).send({ message: 'Error in fetching users' })
    }
}

async function updateUser(request, reply) {
    try {
        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(6),
            // Add more fields as necessary
        })

        const { error } = schema.validate(request.body)
        if (error) {
            return reply
                .status(400)
                .send({ message: 'Invalid user data', error: error.details })
        }

        const updateData = request.body

        const user = await User.findByIdAndUpdate(
            request.params.id,
            updateData,
            {
                new: true,
            }
        )

        if (!user) {
            return reply.status(404).send({ message: 'User not found' })
        }

        const userResponse = { ...user._doc }
        delete userResponse.password // Do not return password

        reply.send({ message: 'User updated successfully', user: userResponse })
    } catch (error) {
        if (error.code === 11000) {
            // MongoDB duplicate key error
            reply.status(400).send({ message: 'Email already exists' })
        } else {
            reply.status(500).send({ message: 'Error in updating user' })
        }
    }
}

async function deleteUser(request, reply) {
    try {
        const user = await User.findByIdAndDelete(request.params.id)

        if (!user) {
            return reply.status(404).send({ message: 'User not found' })
        }

        reply.send({ message: 'User deleted successfully' })
    } catch (error) {
        reply.status(500).send({ message: 'Error in deleting user' })
    }
}

async function getUserFriends(request, reply) {
    let userId = request.params.id

    try {
        const user = await User.findById(userId).populate(
            'friends',
            'username email'
        )

        if (!user) {
            return reply.status(404).send({ message: 'User not found' })
        }

        reply.send(user.friends)
    } catch (error) {
        reply.status(500).send({ message: 'Error in getting user friends' })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserFriends,
}
