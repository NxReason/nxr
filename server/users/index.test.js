const mongoose = require('mongoose');
const { connect, getConnectionString } = require('../db');
const { getUsers, getUser, saveUser } = require('./index');
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

const testUser = {
  name: 'JohnDoe',
  pass: 'verysecret',
  role: 'user',
};

test('gets all users', async () => {
  await saveUser(testUser);
  await saveUser({ ...testUser, name: 'JaneDoe' });

  const res = await getUsers();

  expect(res.success).toBe(true);
  expect(res.users.length).toBe(2);
});

test('gets user by id', async () => {
  const res1 = await saveUser(testUser);
  expect(res1.user._id).toBeDefined();

  const res2 = await getUser(res1.user._id);
  expect(res2.success).toBe(true);
  expect(res2.user).toBeDefined();
  expect(res2.user.name).toBe(res1.user.name);
});

test('receives correct "user not found" error', async () => {
  const res = await getUser();
  expect(res.success).toBe(false);
  expect(res.error.type).toBe('not found');
  expect(res.error.msg.length).toBe(1);
  expect(res.error.msg[0]).toBe('User not found');
});

test('received correct "bad parameters" error', async () => {
  const res = await getUser('invalid id');
  expect(res.success).toBe(false);
  expect(res.error.type).toBe('bad parameters');
  expect(res.error.msg.length).toBe(1);
  expect(res.error.msg[0]).toBe('Invalid id');
});

test('saves new user to db (with hashed pass) & reads it', async () => {
  const res = await saveUser(testUser);

  expect(res.success).toBe(true);
  expect(res.user._id).toBeDefined();
  expect(res.user.name).toBe('JohnDoe');
  expect(res.user.pass).not.toBe('verysecret');
  expect(res.user.role).toBe('user');
});

test('receives correct validation errors', async () => {
  const res = await saveUser({
    name: 'John Doe',
    pass: 'secret',
    role: 'invalid role',
  });

  expect(res.success).toBe(false);
  expect(res.error.type).toBe('validation');
  expect(res.error.msg).toBeInstanceOf(Array);
  expect(res.error.msg.length).toBe(3);
});
