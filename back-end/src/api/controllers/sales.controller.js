const saleService = require('../services/sales.service');
// const { validateRegister } = require('../services/auth.service');
// const { validateLogin } = require('../services/auth.service');

const saleController = {
  create: async (req, res) => {
    const sale = await saleService.validateSales(req.body);
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

  getAllSalesProducts: async (_req, res) => {
    const allSalesProducts = await saleService.getAllSalesProducts();

    return res.status(200).json(allSalesProducts);
  },
  
  // getById: async (req, res) => {
  //   const { id } = req.params;

  //   const user = await userService.getById(id);

  //   return res.status(200).json(user);
  // },

  // getByName: async (req, res) => {
  //   const { name } = req.query;

  //   const lowerName = name.toLowerCase();

  //   const user = await userService.getByName(lowerName);

  //   return res.status(200).json(user);
  // },

  // update: async (req, res) => {
  //   const { id } = req.params;

  //   const { name, email, password } = req.body;

  //   await userService.update(id, { name, email, password });

  //   return res.status(200).json({ message: 'User updated!' });
  // },

  // delete: async (req, res) => {
  //   const { id } = req.params;

  //   await userService.delete(id);

  //   return res.status(204).json();
  // },
};

module.exports = saleController;