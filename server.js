const express = require('express');
const actionRouter = require('./data/routers/actionRouter');
const projectRouter = require('./data/routers/projectRouter');

const server = express();

// global middleware to log a time, method and url
function logger(req, res, next) {
  time = new Date().toISOString();
  console.log(`${req.method} Request, url: ${req.path}, made on ${time}`);
  next();
};

server.use(express.json());
server.use(logger);

server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`API is running`)
});

module.exports = server;
