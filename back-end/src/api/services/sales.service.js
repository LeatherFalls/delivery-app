const Joi = require('joi');
const { Op } = require('sequelize');
const { sales } = require('../../database/models');
const { salesProducts } = require('../../database/models');
const { users } = require('../../database/models');
const { products } = require('../../database/models');

const saleService = {
  validateSales: (data) => {
    const schema = Joi.object({
      userId: Joi.number().required().positive().integer(),
      sellerId: Joi.number().required().positive().integer(),
      totalPrice: Joi.number().required().positive(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      productsSale: Joi.array().required().min(1).items(Joi.object({
        productId: Joi.number().required().positive().integer(),
        quantity: Joi.number().greater(0).required().positive(),
      })),
    });
    
    const { error, value } = schema.validate(data);
  
    if (error) throw error;
  
    return value;
  },

  checkIfExistsArrayOfProductsIds: async (arrayOfId) => {
    const result = await products.findAll({
      where: { id: { [Op.in]: arrayOfId } },
      attributes: { exclude: ['name', 'price', 'urlImage'] },
    });

    const arrayResult = result.map((prod) => prod.id);

    arrayOfId.forEach((prod) => {
      if (!arrayResult.includes(prod)) {
        const error = new Error(`Product id ${prod} not exists`);
        error.name = 'NotFoundError';
        throw error;
      }
    });
  },
  
  checkIfExistUser: async (userId) => {
    const result = await users.findByPk(userId);

    if (!result) {
      const error = new Error('User not exists');
      error.name = 'NotFoundError';
      throw error;
    }
  },

  checkIfExistSaller: async (sellerId) => {
    const result = await users.findByPk(sellerId);

    if (!result) {
      const error = new Error('Seller not exists');
      error.name = 'NotFoundError';
      throw error;
    }
  },
  
  create: async (data) => {
    const {
      userId, sellerId, totalPrice,
      deliveryAddress, deliveryNumber, productsSale } = data;
    const newSale = await sales.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: Date.now(),
      status: 'PENDENTE',
    });
    const { id, saleDate, status } = newSale;
    saleService.createProductsSale(id, productsSale);
    return { id, saleDate, status };
  },

  createProductsSale: async (id, productsSale) => {
    const newProductsSale = productsSale;
    for (let i = 0; i < newProductsSale.length; i += 1) {
      newProductsSale[i].saleId = id;
    }
    await salesProducts.bulkCreate(newProductsSale);
  },

  getAll: async () => {
    const allSales = await sales.findAll({
      attributes: { exclude: ['userId', 'sellerId'] },
      include: [
        {
          model: users,
          as: 'user',
          attributes: { exclude: ['id', 'email', 'password', 'role'] },
        },
        {
          model: users,
          as: 'seller',
          attributes: { exclude: ['id', 'email', 'password', 'role'] },
        },
      ],
    });

    return allSales;
  },

  getAllSalesProducts: async () => {
    const allSalesProducts = await salesProducts.findAll({
      attributes: { exclude: ['saleId', 'productId'] },
      include: [
        {
          model: sales,
          as: 'sales',
          attributes: { exclude:
            ['userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber'] },
        },
        {
          model: products,
          as: 'products',
          attributes: { exclude: ['id', 'price', 'urlImage'] },
        },
      ],
    });

    return allSalesProducts;
  },

  // getByName: async (name) => {
  //   const product = await products.findOne({
  //     where: {
  //       name: {
  //         [Op.like]: `%${name}%`,
  //       },
  //    },
  //   });

  //   return product;
  // },

  // getById: async (id) => {
  //   const product = await products.findOne({ where: { id } });

  //   return product;
  // },

  // update: async (id, { name, price, urlImage }) => {
  //   const product = await products.findOne({ where: { id } });

  //   if (!product) {
  //     throw new Error('Product does not exist');
  //   }

  //   const updatedProduct = await products.update(
  //     {
  //       name: name || product.name,
  //       price: price || product.price,
  //       urlImage: urlImage || product.urlImage,
  //     },
  //     { where: { id } },
  //   );

  //   return updatedProduct;
  // },

  // delete: async (id) => {
  //   const product = await products.findOne({ where: { id } });

  //   if (!product) {
  //     throw new Error('Product does not exist');
  //   }

  //   const deletedProduct = await products.destroy({ where: { id } });

  //   return deletedProduct;
  // },
};

module.exports = saleService;
