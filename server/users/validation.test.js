const validate = require('./validation');

const validUser = { name: 'JohnDoe', pass: 'verysecret', role: 'admin' };

test('shoud be okay with valid params', () => {
  let result = validate(validUser);
  expect(result.valid).toBe(true);
  expect(result.errors).toBeInstanceOf(Array);
  expect(result.errors.length).toBe(0);

  // check for admin role
  result = validate({ ...validUser, role: 'admin' });
  expect(result.valid).toBe(true);
  expect(result.errors.length).toBe(0);
});

// name tests
test('should fail if name is empty', () => {
  const result = validate({ ...validUser, name: '' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch(/Name can't be empty/);
});

test('should fail if name is too short', () => {
  let result = validate({ ...validUser, name: 'a' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch(/Name must have at least/);
});

test('should fail if name contains non alphanumerical symbols', () => {
  let result = validate({ ...validUser, name: 'r2d2!' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch(/Name can only contain/);
});

test('should fail (with 2 errors) if name too short & non alphanum', () => {
  let result = validate({ ...validUser, name: '.' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(2);
  expect(result.errors[0]).toMatch(/Name must have at least/);
  expect(result.errors[1]).toMatch(/Name can only contain/);
});

// pass tests
test('should fail if pass is too short', () => {
  let result = validate({ ...validUser, pass: 'secret' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch(/Pass must have at least/);
});

// role tests
test('should fail if role not on the role list', () => {
  let result = validate({ ...validUser, role: 'random role' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(1);
  expect(result.errors[0]).toMatch(/Role must be one of/);
});

// combined
test('should fail if name & pass is invalid', () => {
  let result = validate({ name: '!', pass: '?', role: 'admin' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(3);
  expect(result.errors[0]).toMatch(/Name must have at least/);
  expect(result.errors[1]).toMatch(/Name can only contain/);
  expect(result.errors[2]).toMatch(/Pass must have at least/);

  // check with empty name
  result = validate({ name: '', pass: '?', role: 'admin' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(2);
  expect(result.errors[0]).toMatch(/Name can't be empty/);
  expect(result.errors[1]).toMatch(/Pass must have at least/);
});

test('should fail if all fields are invalid', () => {
  let result = validate({ name: '!', pass: '?', role: 'noone' });
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBe(4);
  expect(result.errors[0]).toMatch(/Name must have at least/);
  expect(result.errors[1]).toMatch(/Name can only contain/);
  expect(result.errors[2]).toMatch(/Pass must have at least/);
  expect(result.errors[3]).toMatch(/Role must be one of/);
});
