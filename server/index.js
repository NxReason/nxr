const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');
const populate = require('./utils/populate');
const session = require('./utils/session');

const app = express();

async function run(env) {
  app.use(express.static(path.join(__dirname, 'static')));

  if (env === 'development') {
    app.use(cors());
  }

  app.use(session);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/', routes);

  const connString = db.getConnectionString(env);
  await db.connect(connString);

  // prepopulate db in dev mode
  if (env === 'development') {
    await populate();
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

module.exports = {
  run,
};
