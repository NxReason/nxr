const router = require('express').Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send({ all: 'good' });
});

module.exports = router;
