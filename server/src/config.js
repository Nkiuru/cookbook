const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const WORKERS = process.env.WORKERS;
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  DB_URL,
  WORKERS,
  JWT_LIFE_TIME,
  JWT_SECRET,
};
