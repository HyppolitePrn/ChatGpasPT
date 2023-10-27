const User = require('../models/User');

async function createUser(request, reply) {
    try {
      const userData = request.body;

      const user = new User(userData);

      await user.save();
  
      reply.code(201).send({ message: 'User created successfully', user });

    } catch (error) {

      reply.status(500).send({ message: 'Error in creating user', error });
    }
}

async function getAllUsers(request, reply) {
    try {

      const users = await User.find();

      reply.send(users);

    } catch (error) {

      reply.status(500).send({ message: 'Error in fetching users', error });
    }
}

module.exports = {
    createUser,
    getAllUsers
};