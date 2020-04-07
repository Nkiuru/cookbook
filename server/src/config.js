const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const WORKERS = process.env.WORKERS;
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const SSL_CERT = process.env.SSL_CERT;
const SSL_KEY = process.env.SSL_KEY;

module.exports = {
  PORT,
  DB_URL,
  WORKERS,
  JWT_LIFE_TIME,
  JWT_SECRET,
  NODE_ENV,
  SSL_CERT,
  SSL_KEY,
};
