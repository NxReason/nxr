const path = require('path');
const express = require('express');

const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', routes);

async function run(env) {
  const connString = db.getConnectionString(env);
  await db.connect(connString);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

module.exports = {
  run,
};
