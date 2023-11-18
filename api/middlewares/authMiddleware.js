// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken')

module.exports = async function (fastify) {
  // Add a preHandler to every route
  fastify.addHook('preHandler', async (request, reply) => {
    const whitelist = ['/login', '/register']

    // If the route is in the whitelist, skip token verification
    if (whitelist.includes(request.routerPath)) {
      return
    }

    try {
      const authHeader = request.headers.authorization
      if (!authHeader) {
        throw new Error('Authentication failed. Please provide a token.')
      }

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)

      request.user = { id: decoded.id }
    } catch (err) {
      reply.code(401).send({ message: err.message })
    }
  })
}
