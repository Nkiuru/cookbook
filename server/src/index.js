const throng = require('throng');
const mongoose = require('mongoose');
const url = require('url');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app.js');
const config = require('./config.js');
require('./models/rating');
const mongoHost = new url.URL(config.DB_URL).host;

const startServer = async () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  try {
    await Promise.all([mongoose.connect(config.DB_URL, mongooseOptions)]);
    if (config.NODE_ENV === 'development') {
      app.listen(config.PORT);
    }
    const options = {
      key: fs.readFileSync(config.SSL_KEY),
      cert: fs.readFileSync(config.SSL_CERT),
    };
    https.createServer(options, app).listen(8000);
    console.log(`Server started on port: ${config.PORT}, connected to mongo at ${mongoHost}`);
  } catch (error) {
    console.error('App could not be started:', error);
  }
};

throng(
  {
    workers: config.WORKERS,
    lifetime: Infinity,
  },
  startServer,
);
