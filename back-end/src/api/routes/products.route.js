const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get(
  '/products',
  productsController.getAll,
);

productsRouter.post(
  '/products',
  productsController.create,
);

productsRouter.get(
  '/products/name/search',
  productsController.getByName,
);

module.exports = productsRouter;