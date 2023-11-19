const User = require('../models/User')
const FriendRequest = require('../models/FriendRequest')

async function sendFriendRequest(request, reply) {
  const { from, to } = request.body

  try {
    const friendRequest = new FriendRequest({ from, to })
    await friendRequest.save()

    const fromUser = await User.findByIdAndUpdate(
      from,
      {
        $push: { sentFriendRequests: friendRequest._id },
      },
      { new: true }
    )

    const toUser = await User.findByIdAndUpdate(
      to,
      {
        $push: { friendRequests: friendRequest._id },
      },
      { new: true }
    )

    reply.send({ message: 'Friend request sent successfully' })
  } catch (error) {
    winston.error('Error in sending friend request', error)
    reply.status(500).send({ message: 'Error in sending friend request' })
  }
}

async function getUserFriendRequests(request, reply) {
  let userId = request.params.id

  try {
    const friendRequests = await FriendRequest.find({
      to: userId,
      status: { $ne: 'accepted' },
    })
      .populate('from', 'username email')
      .sort('-createdAt')
      .lean()

    reply.send(friendRequests)
  } catch (error) {
    winston.error('Error in getting friend requests', error)
    reply.status(500).send({ message: 'Error in getting friend requests' })
  }
}

async function acceptFriendRequest(request, reply) {
  let userId = request.params.id

  try {
    const friendRequests = await FriendRequest.find({ to: userId })
      .populate('from', 'username email')
      .sort('-createdAt')
      .lean()

    reply.send(friendRequests)
  } catch (error) {
    winston.error('Error in getting friend requests', error)
    reply.status(500).send({ message: 'Error in getting friend requests' })
  }
}

async function acceptFriendRequest(request, reply) {
  let requestId = request.params.id

  try {
    const friendRequest = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    ).populate('from', 'username email')

    if (!friendRequest) {
      return reply.status(404).send({ message: 'Friend request not found' })
    }

    await User.findByIdAndUpdate(
      friendRequest.to,
      {
        $push: { friends: friendRequest.from._id },
        $pull: { friendRequests: requestId },
      },
      { new: true }
    )

    await User.findByIdAndUpdate(
      friendRequest.from._id,
      {
        $push: { friends: friendRequest.to },
        $pull: { sentFriendRequests: requestId },
      },
      { new: true }
    )

    reply.send(friendRequest)
  } catch (error) {
    winston.error('Error in accepting friend request', error)
    reply.status(500).send({ message: 'Error in accepting friend request' })
  }
}

module.exports = {
  sendFriendRequest,
  getUserFriendRequests,
  acceptFriendRequest,
}
