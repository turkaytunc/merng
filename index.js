const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const { mongoConnectionString, PORT } = require('./config');
const { resolvers } = require('./resolvers/resolvers');
const { typeDefs } = require('./typedefs/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(mongoConnectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongo atlas'))
  .then(() => server.listen(PORT))
  .then((res) => console.log(`Server running at ${res.url}`));
