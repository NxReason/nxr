const bcrypt = require('bcrypt');
const User = require('../db/User');

async function auth({ name, pass }) {
  const userDb = await User.findOne({ name });
  if (!userDb)
    return {
      success: false,
      reason: 'User not found',
    };

  const comp = await bcrypt.compare(pass, userDb.pass);

  if (!comp)
    return {
      success: false,
      reason: 'Wrong password',
    };

  return { success: true, user: userDb };
}

module.exports = auth;
