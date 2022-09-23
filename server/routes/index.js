const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('home page');
});

router.get('/about', (_, res) => {
  res.send('about page');
});

module.exports = router;
