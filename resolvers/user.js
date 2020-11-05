const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const SECRET = process.env.SECRET;

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    register: async (parent, args, context, info) => {
      const { username, email, password, confirmPassword } = args.registerInput;
      const passwordHash = await bcryptjs.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password: passwordHash,
        createdAt: new Date().toISOString(),
      });

      const response = await newUser.save();
      const token = jwt.sign(
        {
          id: response.id,
          email: response.email,
          username: response.username,
        },
        SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...response._doc,
        id: response._id,
        token,
      };
    },
  },
};
