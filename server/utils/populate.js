const { getUsers, saveUser } = require('../users');

const devUsers = [
  { name: 'Reasons', pass: 'verysecret', role: 'admin' },
  { name: 'JohnDoe', pass: 'evenmoresecret', role: 'user' },
];

async function populate() {
  const { users } = await getUsers();
  if (users.length === 0) {
    const reqs = devUsers.map(du => saveUser(du));
    await Promise.all(reqs);
  }
}

module.exports = populate;
