const userController = require('../controllers/userController');

module.exports = [
  {
    method: 'GET',
    url: '/users',
    handler: userController.getAllUsers,
  },
  {
    method: 'POST',
    url: '/users',
    handler: userController.createUser,
  },
]
