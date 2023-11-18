const authController = require('../controllers/authController')

module.exports = [
  {
    method: 'POST',
    url: '/login',
    handler: authController.login,
  },
  {
    method: 'POST',
    url: '/register',
    handler: authController.register,
  },
  {
    method: 'POST',
    url: '/logout',
    handler: authController.logout,
  },
]
