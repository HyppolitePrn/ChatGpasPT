const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        messageType: {
            type: String,
            required: true,
            enum: ['text', 'image'],
        },
        message: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        timeStamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
