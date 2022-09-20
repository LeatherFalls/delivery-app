const express = require('express');

const app = express();

app.get('/test', (_req, res) => res.status(418).end());

module.exports = app;
