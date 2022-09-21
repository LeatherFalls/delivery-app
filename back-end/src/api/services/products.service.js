const Joi = require('joi');
const { Op } = require('sequelize');
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

  getByName: async (name) => {
    const product = await products.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
     },
    });

    return product;
  },

  getById: async (id) => {
    const product = await products.findOne({ where: { id } });

    return product;
  },

  update: async (id, { name, price, urlImage }) => {
    const product = await products.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product does not exist');
    }

    const updatedProduct = await products.update(
      {
        name: name || product.name,
        price: price || product.price,
        urlImage: urlImage || product.urlImage,
      },
      { where: { id } },
    );

    return updatedProduct;
  },

  delete: async (id) => {
    const product = await products.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product does not exist');
    }

    const deletedProduct = await products.destroy({ where: { id } });

    return deletedProduct;
  },
};

module.exports = productsService;