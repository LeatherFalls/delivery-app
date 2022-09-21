const productsService = require('../services/products.service');
const { validateToken } = require('../services/auth.service');

const productsController = {
   create: async (req, res) => {
      const { name, price, urlImage } = productsService.validateProducts(req.body);

      const { authorization } = req.headers;

      validateToken(authorization);

      const product = await productsService.create(name, price, urlImage);

      res.status(201).json(product);
   },

   getAll: async (req, res) => {
    const { authorization } = req.headers;

    validateToken(authorization);

    const allProducts = await productsService.getAll();

    res.status(200).json(allProducts);
   },
};

module.exports = productsController;