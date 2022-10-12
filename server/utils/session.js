const session = require('express-session');

const key = process.env.SESSION_KEY;
if (!key) {
  throw new Error('Session key undefined');
}

const options = {
  secret: key,
  resave: false,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

module.exports = session(options);
