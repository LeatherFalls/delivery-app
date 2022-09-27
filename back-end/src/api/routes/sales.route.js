const { Router } = require('express');
const saleController = require('../controllers/sales.controller');

const saleRouter = Router();

const routeSale = '/sales';

saleRouter.post(routeSale, saleController.create);
saleRouter.get(routeSale, saleController.getAll);
saleRouter.get(`${routeSale}/seller/:id`, saleController.getBySellerId);
saleRouter.get(`${routeSale}/user/:id`, saleController.getByUserId);
saleRouter.get(`${routeSale}/:id`, saleController.getBySaleId);
saleRouter.put(`${routeSale}/:id`, saleController.update);
saleRouter.delete(`${routeSale}/:id`, saleController.delete);

module.exports = saleRouter;
