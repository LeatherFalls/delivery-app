const { Router } = require('express');
const saleController = require('../controllers/sales.controller');

const saleRouter = Router();

saleRouter.post('/sales', saleController.create);
saleRouter.get('/sales', saleController.getAll);
saleRouter.get('/sales/products', saleController.getAllSalesProducts);

module.exports = saleRouter;
