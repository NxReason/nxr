const mongoose = require('mongoose');

function getConnectionString(env) {
  let connString;
  switch (env) {
    case 'production':
      connString = process.env.MONGO;
      break;
    case 'development':
      connString = process.env.MONGO_DEV;
      break;
    default:
      throw new Error('Unknown node env (set to "production" or "development"');
  }
  return connString;
}

async function connect(connString) {
  await mongoose.connect(connString);
}

module.exports = {
  getConnectionString,
  connect,
};
