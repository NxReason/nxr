const bcrypt = require('bcrypt');

const User = require('../db/User');
const validate = require('./validation');
const { passSaltRounds } = require('./config');
const { generateResponse, generateErrorResponse } = require('../api');

async function saveUser({ name = '', pass = '', role = 'user' }) {
  // validate fields
  const validation = validate({ name, pass, role });
  if (!validation.valid) {
    return generateErrorResponse(
      {
        type: 'validation',
        msg: validation.errors,
      },
      { user: null }
    );
  }
  // hash password
  const salt = await bcrypt.genSalt(passSaltRounds);
  const hash = await bcrypt.hash(pass, salt);

  // save to db
  const user = new User({ name, pass: hash, role });
  await user.save();

  // return updated user
  return generateResponse({ user });
}

module.exports = {
  saveUser,
};
