const router = require('express').Router();

const { getUsers, getUser, saveUser } = require('../users');

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  res.send(user);
});

router.post('/', async (req, res) => {
  const { name, pass, role } = req.body;
  const user = await saveUser({ name, pass, role });
  res.send(user);
});

module.exports = router;
