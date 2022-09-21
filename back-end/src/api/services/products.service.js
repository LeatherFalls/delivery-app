const Joi = require('joi');
const { products } = require('../../database/models');

const productsService = {
  validateProducts: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().positive(),
      urlImage: Joi.string().required(),
    });
  
    const { error, value } = schema.validate(data);
  
    if (error) throw error;
  
    return value;
  },

  create: async (name, price, urlImage) => {
    const productExists = await products.findOne({ where: { name } });

    if (productExists) {
      throw new Error('Product already exists');
    }
    
    const product = await products.create({ name, price, urlImage });

    return product;
  },

  getAll: async () => {
    const allProducts = await products.findAll();

    return allProducts;
  },
};

module.exports = productsService;