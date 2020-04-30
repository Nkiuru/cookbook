const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const context = require('./utils/context');
const schema = require('./modules');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await context.getUser(req),
  }),
  uploads: true,
});

const app = express();
app.use(cors());

server.applyMiddleware({
  path: '/graphql',
  app,
});
app.use('/static', express.static(path.join(__dirname, '../uploads')));

module.exports = app;
