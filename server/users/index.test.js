const mongoose = require('mongoose');
const { connect, getConnectionString } = require('../db');
const { saveUser } = require('./index');
const User = require('../db/User');
require('dotenv').config();

beforeAll(async () => {
  await connect(getConnectionString('development'));
});
afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

test('saves new user to db (with hashed pass) & reads it', async () => {
  const res = await saveUser({
    name: 'JohnDoe',
    pass: 'verysecret',
    role: 'user',
  });

  expect(res.success).toBe(true);
  expect(res.user._id).toBeDefined();
  expect(res.user.name).toBe('JohnDoe');
  expect(res.user.pass).not.toBe('verysecret');
  expect(res.user.role).toBe('user');
});
