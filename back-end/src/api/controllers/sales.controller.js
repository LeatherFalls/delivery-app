const saleService = require('../services/sales.service');
// const { validateRegister } = require('../services/auth.service');
// const { validateLogin } = require('../services/auth.service');

const saleController = {
  create: async (req, res) => {
    const sale = saleService.validateSales(req.body);
    const { productsSale, userId, sellerId } = sale;
    const arryaOfId = productsSale.map((prod) => prod.productId);
    await saleService.checkIfExistsArrayOfProductsIds(arryaOfId); 
    await saleService.checkIfExistUser(userId);
    await saleService.checkIfExistSaller(sellerId);
    const newSaleId = await saleService.create(sale);
    res.status(201).json({ ...newSaleId, ...sale });
  },

  getAll: async (_req, res) => {
    const allSales = await saleService.getAll();

    return res.status(200).json(allSales);
  },
  
  getById: async (req, res) => {
    const { id } = saleService.validateSaleId(req.params);

    const sale = await saleService.getById(id);

    return res.status(200).json(sale);
  },

  update: async (req, res) => {
    const { id } = saleService.validateSaleId(req.params);
    const { productsSale } = saleService.validateSaleProductsUpdate(req.body);
    const arryaOfId = productsSale.map((prod) => prod.productId);
    await saleService.checkIfExistsArrayOfProductsIds(arryaOfId); 
    await saleService.update(id, productsSale);

    return res.status(200).json({ message: 'Products sale updated!' });
  },

  delete: async (req, res) => {
    const { id } = saleService.validateSaleId(req.params);

    await saleService.delete(id);

    return res.status(204).json();
  },
};

module.exports = saleController;
