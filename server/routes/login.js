const router = require('express').Router();

const auth = require('../auth');

router.post('/', async (req, res) => {
  const authResult = await auth(req.body);
  if (authResult.success) {
    req.session.user = authResult.user;
    res.send({ all: 'good' });
  } else {
    res.send({ all: 'auth failed' });
  }
});

module.exports = router;
