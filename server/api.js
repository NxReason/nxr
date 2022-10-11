const baseRes = {
  success: true,
};

const baseErrorRes = {
  success: false,
  error: {
    type: '',
    msg: [],
  },
};

function generateResponse(data) {
  return { ...baseRes, ...data };
}
function generateErrorResponse({ type, msg }, extra = {}) {
  return { ...baseErrorRes, error: { type, msg }, ...extra };
}

module.exports = {
  generateResponse,
  generateErrorResponse,
};
