const User = require('../models/User')

async function sendFriendRequest(request, reply) {
  const { from, to } = request.body

  try {
    const fromUser = await User.findByIdAndUpdate(
      from,
      {
        $push: { sentFriendRequests: to },
      },
      { new: true }
    )

    const toUser = await User.findByIdAndUpdate(
      to,
      {
        $push: { friendRequests: from },
      },
      { new: true }
    )

    reply.send({ message: 'Friend request sent successfully' })
  } catch (error) {
    winston.error('Error in sending frien request', error)
    reply.status(500).send({ message: 'Error in sending friend request' })
  }
}

module.exports = {
  sendFriendRequest,
}
