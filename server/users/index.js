const User = require('../db/User');
const validate = require('./validation');
const bcrypt = require('bcrypt');

async function saveUser({ name = '', pass = '', role = 'user' }) {
  // validate fields
  const validation = validate({ name, pass, role });
  if (!validation.valid) {
    return {
      success: false,
      user: null,
      errorType: 'ValidationError',
      errors: validation.errors,
    }; // TODO: generate api response module
  }
  // hash password
  const saltRounds = 10; // TODO: move to config
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);

  // save to db
  const user = new User({ name, pass: hash, role });
  await user.save();

  // return updated user
  return {
    success: true,
    user,
  };
}

module.exports = {
  saveUser,
};
