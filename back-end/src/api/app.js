require('express-async-errors');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const productsRouter = require('./routes/products.route');
const saleRouter = require('./routes/sales.route');
const errors = require('./errors/errors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/', productsRouter);
app.use('/', saleRouter);

app.use(errors);

module.exports = app;
