require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = async function (fastify) {
  fastify.addHook('preHandler', async (request, reply) => {
    const whitelist = ['/login', '/register']

    if (whitelist.includes(request.routeOptions.url)) {
      return
    }

    try {
      const authHeader = request.headers.authorization

      if (!authHeader) {
        throw new Error('Authentication failed. Please provide a token.')
      }

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)

      request.user = { id: decoded.userId }
    } catch (err) {
      reply.code(401).send({ message: err.message })
    }
  })
}
