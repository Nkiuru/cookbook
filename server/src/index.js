const throng = require('throng');
const mongoose = require('mongoose');
const url = require('url');
const app = require('./app.js');
const config = require('./config.js');

const mongoHost = new url.URL(config.DB_URL).host;

const startServer = async () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  };
  try {
    await Promise.all([
      mongoose.connect(config.DB_URL, mongooseOptions),
      app.listen(config.PORT),
    ]);
    console.log(
      `Server started on port: ${config.PORT}, connected to mongo at ${mongoHost}`,
    );
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
