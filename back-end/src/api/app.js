require('express-async-errors');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const errors = require('./errors/errors.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter)
app.use(errors);

module.exports = app;
