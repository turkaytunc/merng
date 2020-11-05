const Post = require('../models/Post');
const User = require('../models/User');

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = {
  resolvers: resolvers,
};
