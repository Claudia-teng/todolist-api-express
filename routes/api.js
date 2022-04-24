const express = require('express');
const api = express.Router();
const postsRouter = require('./post');

api.use('/posts', postsRouter);

module.exports = api;