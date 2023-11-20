const messageController = require('../controllers/messageController')
const multer = require('fastify-multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
})
const upload = multer({ storage: storage })
module.exports = fastify => [
    {
        method: 'POST',
        url: '/messages',
        preHandler: upload.single('imageFile'),
        handler: messageController.createMessage,
    },
    {
        method: 'GET',
        url: '/messages',
        handler: messageController.getMessagesBetweenUsers,
    },
    // {
    //     method: 'GET',
    //     url: '/messages/:id',
    //     handler: messageController.getMessageById,
    // },
    // {
    //     method: 'PUT',
    //     url: '/messages/:id',
    //     handler: messageController.updateMessage,
    // },
    // {
    //     method: 'DELETE',
    //     url: '/messages/:id',
    //     handler: messageController.deleteMessage,
    // }
]
