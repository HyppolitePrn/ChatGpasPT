const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

module.exports = [...userRoutes, ...authRoutes]
