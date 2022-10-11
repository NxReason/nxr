const { roles } = require('./config');

function validate({ name, pass, role }) {
  const fields = [validateName(name), validatePass(pass), validateRole(role)];
  return fields.reduce(
    (prev, curr) => {
      return {
        valid: prev.valid && curr.valid,
        errors: [...prev.errors, ...curr.errors],
      };
    },
    { valid: true, errors: [] }
  );
}

function validateName(name) {
  const result = { valid: true, errors: [] };
  if (name.length === 0) {
    result.valid = false;
    result.errors.push("Name can't be empty (at least 2 characters)");
    return result;
  }
  if (name.length === 1) {
    result.valid = false;
    result.errors.push('Name must have at least 2 characters');
  }
  if (name.search(/[^a-z0-9]/gi) >= 0) {
    result.valid = false;
    result.errors.push('Name can only contain letters and digits');
  }
  return result;
}

function validatePass(pass) {
  const result = { valid: true, errors: [] };
  if (pass.length < 8) {
    result.valid = false;
    result.errors.push('Pass must have at least 8 characters');
  }
  return result;
}

function validateRole(role) {
  const result = { valid: true, errors: [] };
  if (!roles.includes(role)) {
    result.valid = false;
    const rolesList = roles.join(', ');
    result.errors.push(`Role must be one of: ${rolesList}. Received ${role}`);
  }
  return result;
}
module.exports = validate;
