const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = Router();

const PRODUCTS_ID = '/products/:id';

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

productsRouter.get(
  PRODUCTS_ID,
  productsController.getById,
);

productsRouter.put(
  PRODUCTS_ID,
  productsController.update,
);

productsRouter.delete(
  PRODUCTS_ID,
  productsController.delete,
);

module.exports = productsRouter;