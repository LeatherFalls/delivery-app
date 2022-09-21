const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get(
  '/products',
  productsController.getAll,
);

module.exports = productsRouter;