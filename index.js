require('dotenv').config();
const { NODE_ENV } = process.env;

const server = require('./server');

server.run(NODE_ENV);
