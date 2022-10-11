const router = require('express').Router();

const users = require('./users');

router.get('/', (req, res) => {
  res.send('home page');
});

router.get('/about', (_, res) => {
  res.send('about page');
});

// api
router.use('/api/users', users);

module.exports = router;
