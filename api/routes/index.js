const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const friendRequestRoutes = require('./friendRequestRoutes')
const messageRoutes = require('./messageRoutes')

module.exports = fastify => [
    ...userRoutes,
    ...authRoutes,
    ...friendRequestRoutes,
    ...messageRoutes(fastify),
]
