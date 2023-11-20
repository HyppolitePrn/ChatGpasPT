require('dotenv').config()

const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const cors = require('@fastify/cors')
const authMiddleware = require('./middlewares/authMiddleware')
const io = require('socket.io')(fastify.server)

const multer = require('fastify-multer')

fastify.register(multer.contentParser)

const routes = require('./routes')(fastify)

authMiddleware(fastify)

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.1ix928u.mongodb.net/`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('MongoDB is connected My Friend')
    })
    .catch(err => {
        console.log('Error in connecting to MongoDB', err)
    })

fastify.register(cors, {
    origin: '*',
})

routes.forEach(route => {
    fastify.route(route)
})

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

//     socket.on('message', (msg) => {
//         console.log('message: ' + msg);
//         socket.broadcast.emit('message', msg);
//     });
// });

try {
    fastify.listen({ port: process.env.DB_PORT, host: process.env.PRIVATE_IP })
} catch (error) {
    fastify.log.error(err)
}
