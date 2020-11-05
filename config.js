require('dotenv').config();

module.exports = {
  mongoConnectionString: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@codecamp-graphql.ihj2d.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
};
