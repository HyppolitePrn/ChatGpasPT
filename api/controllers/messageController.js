const fastify = require('fastify')
const Message = require('../models/Message')

async function createMessage(request, reply) {
    try {
        const { from, to, messageType, messageText } = request.body

        const newMessage = new Message({
            from,
            to,
            messageType,
            message: messageText,
            timestamp: new Date(),
            imageUrl: messageType === 'image' ? request.file.path : null,
        })

        await newMessage.save()
        reply.code(200).send({ message: 'Message sent Successfully' })
    } catch (error) {
        console.log(error)
        reply.code(500).send({ error: 'Internal Server Error' })
    }
}

async function getMessagesBetweenUsers(request, reply) {
    const { from, to } = request.query

    try {
        const messages = await Message.find({
            $or: [
                { from: from, to: to },
                { from: to, to: from },
            ],
        }).populate('from', '_id username')

        reply.code(200).send(messages)
    } catch (error) {
        console.log(error)
        reply.code(500).send({ error: 'Internal Server Error' })
    }
}

module.exports = {
    createMessage,
    getMessagesBetweenUsers,
}
