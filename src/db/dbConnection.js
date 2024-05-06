const mongoose = require('mongoose');

async function dataBaseConection() {
  mongoose.connect(process.env.MONGO_DB_URL);
  return mongoose.connection;
};

module.exports = dataBaseConection;
