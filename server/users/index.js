const UserModel = require('../db/User');
const validate = require('./validation');

async function saveUser({ name = '', pass = '', role = 'user' }) {
  // validate fields
  const validation = validate({ name, pass, role });
  if (!validation.valid) {
    return {
      success: false,
      user: null,
      errorType: 'ValidationError',
      errors: validation.errors,
    };
  }
  // hash password
  // save to db
  // return updated user
}

module.exports = {
  saveUser,
};
