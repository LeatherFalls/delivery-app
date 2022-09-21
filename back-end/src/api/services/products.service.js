const { products } = require('../../database/models');

const productsService = {
  getAll: async () => {
    const allProducts = await products.findAll();

    return allProducts;
  },
};

module.exports = productsService;