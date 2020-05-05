const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const helmet = require('helmet');
const context = require('./utils/context');
const schema = require('./modules');
const config = require('./config.js');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await context.getUser(req),
  }),
  uploads: true,
});

const app = express();
app.use(helmet());
app.enable('trust proxy');
app.use((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    if (config.NODE_ENV === 'production') {
      res.redirect('https://' + req.headers.host + req.url);
    } else {
      next();
    }
  }
});

const corsOptions = {
  origin: ['http://localhost:3001', 'https://env-6758651.jelastic.metropolia.fi'],
  credentials: true,
};
app.use(cors(corsOptions));

server.applyMiddleware({
  path: '/graphql',
  app,
});
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = app;
