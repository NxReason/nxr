require('dotenv').config();
const { getConnectionString } = require('./index');

test('returns correct connection string', () => {
  let cs = getConnectionString('production');
  expect(cs).toBeDefined();
  expect(cs.length).toBeGreaterThan(0);
  expect(cs).toBe(process.env.MONGO);

  cs = getConnectionString('development');
  expect(cs).toBeDefined();
  expect(cs.length).toBeGreaterThan(0);
  expect(cs).toBe(process.env.MONGO_DEV);
  expect(cs).toMatch(/test/);
});

test('throws when given wrong env var', () => {
  expect(() => getConnectionString()).toThrow(/Unknown node env/);
  expect(() => getConnectionString('some random env')).toThrow(
    /Unknown node env/
  );
});
