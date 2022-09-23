const path = require('path');
const express = require('express');

const routes = require('./server/routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
