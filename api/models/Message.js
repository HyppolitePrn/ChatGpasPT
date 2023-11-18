const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  messageAuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipientId: {
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
    required: true,
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
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
