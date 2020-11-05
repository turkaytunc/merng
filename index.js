const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { mongoConnectionString, PORT } = require('./config');
const { resolvers } = require('./resolvers/resolvers');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

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
