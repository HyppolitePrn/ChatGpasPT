const friendRequestRoutes = require('../controllers/friendRequestController')

module.exports = [
  {
    method: 'POST',
    url: '/friend-requests',
    handler: friendRequestRoutes.sendFriendRequest,
  },
]
