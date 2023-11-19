const friendRequestRoutes = require('../controllers/friendRequestController')

module.exports = [
  {
    method: 'POST',
    url: '/friend-requests',
    handler: friendRequestRoutes.sendFriendRequest,
  },
  {
    method: 'GET',
    url: '/friend-requests/users/:id',
    handler: friendRequestRoutes.getUserFriendRequests,
  },
  {
    method: 'PUT',
    url: '/friend-requests/accept/:id',
    handler: friendRequestRoutes.acceptFriendRequest,
  },
]
