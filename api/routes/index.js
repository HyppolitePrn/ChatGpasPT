const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const friendRequestRoutes = require('./friendRequestRoutes')

module.exports = [...userRoutes, ...authRoutes, ...friendRequestRoutes]
