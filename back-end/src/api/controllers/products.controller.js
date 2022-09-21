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

   getByName: async (req, res) => {
    const { authorization } = req.headers;

    validateToken(authorization);

    const { name } = req.query;

    const lowerName = name.toLowerCase();

    const product = await productsService.getByName(lowerName);

    res.status(200).json(product);
   },

   getById: async (req, res) => {
    const { authorization } = req.headers;

    validateToken(authorization);

    const { id } = req.params;

    const product = await productsService.getById(id);

    res.status(200).json(product);
   },

   update: async (req, res) => {
    const { authorization } = req.headers;

    validateToken(authorization);

    const { id } = req.params;

    const { name, price, urlImage } = productsService.validateProducts(req.body);

    const product = await productsService.update(id, { name, price, urlImage });

    res.status(200).json(product);
   },

   delete: async (req, res) => {
    const { authorization } = req.headers;

    validateToken(authorization);

    const { id } = req.params;

    await productsService.delete(id);

    res.sendStatus(204);
   },
};

module.exports = productsController;