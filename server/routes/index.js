const router = require('express').Router();

const login = require('./login');
const users = require('./users');

router.get('/', (req, res) => {
  res.send('home page');
});

router.get('/about', (_, res) => {
  res.send('about page');
});

// api
router.use('/api/login', login);
router.use('/api/users', users);

module.exports = router;
