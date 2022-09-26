const mongoose = require('mongoose');
const { connect, getConnectionString } = require('./index');
const User = require('./User');
require('dotenv').config();

// setup & teardown
beforeAll(async () => {
  await connect(getConnectionString('development'));
});
afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

test('creates and reads new user', async () => {
  const user = new User({ name: 'John Doe', pass: 'secret', role: 'user' });
  expect(user._id).toBeDefined();

  await user.save();
  const savedUser = await User.findById(user._id);
  expect(savedUser._id instanceof mongoose.Types.ObjectId).toBe(true);
  expect(savedUser.name).toBe('John Doe');
  expect(savedUser.pass).toBe('secret');
  expect(savedUser.role).toBe('user');
});

test('updates user', async () => {
  // create & save new user
  const user = new User({
    name: 'Old name',
    pass: 'not very secret',
    role: 'invalid role',
  });
  expect(user._id).toBeDefined();
  await user.save();

  // get this user & update
  const savedUser = await User.findOne({ name: 'Old name' });
  expect(savedUser.pass).toBe('not very secret');
  expect(savedUser.role).toBe('invalid role');
  savedUser.name = 'New name';
  savedUser.pass = 'secret';
  savedUser.role = 'valid role';
  await savedUser.save();

  // check if updated correctly
  const updatedUser = await User.findOne({ name: 'New name' });
  expect(updatedUser.pass).toBe('secret');
  expect(updatedUser.role).toBe('valid role');

  // update again with different method
  await User.updateOne(
    { _id: user._id },
    { name: 'Fancy name', pass: 'not very secret again' }
  );
  const updatedUser2 = await User.findOne({ _id: user._id });
  expect(updatedUser2.name).toBe('Fancy name');
  expect(updatedUser2.pass).toBe('not very secret again');
  expect(updatedUser2.role).toBe('valid role');

  // check if only one user stil exists in db
  const users = await User.find({});
  expect(users).toBeInstanceOf(Array);
  expect(users.length).toBe(1);
});
