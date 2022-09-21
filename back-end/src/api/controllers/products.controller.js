const productsService = require('../services/products.service');
const { validateToken } = require('../services/auth.service');

const productsController = {
   getAll: async (req, res) => {
    const { authorization } = req.headers;
    validateToken(authorization);
    const allProducts = await productsService.getAll();
    res.status(200).json(allProducts);
   },
};

module.exports = productsController;