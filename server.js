const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('./projects/project-router');
const actionRouter = require('./actions/action-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res, next) => {
    res.send(`
    <h1>Don't code be happy</h1>
    `)
});

module.exports = server;