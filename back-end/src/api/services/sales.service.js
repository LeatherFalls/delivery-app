const Joi = require('joi');
const { Op } = require('sequelize');
const { sales, salesProducts, users, products } = require('../../database/models');

const includeUser = {
  model: users,
  as: 'user',
  attributes: { exclude: ['email', 'password'] },
};

const includeSeller = {
  model: users,
  as: 'seller',
  attributes: { exclude: ['email', 'password'] },
};

const includeProducts = {
  model: products,
  as: 'products',
  attributes: { exclude: ['urlImage'] },
};

const includeSaleProducts = {
  model: salesProducts,
  as: 'saleProducts',
  attributes: { exclude: ['productId', 'saleId'] },
  include: [includeProducts],
};

const SALE_NOT_FOUND = 'Sale not found';

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

  validateId: (id) => {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });
    
    const { error, value } = schema.validate(id);
  
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
  
  validateSaleProductsUpdate: (data) => {
    const schema = Joi.object({
      productsSale: Joi.array().required().min(1).items(Joi.object({
        productId: Joi.number().required().positive().integer(),
        quantity: Joi.number().greater(0).required().positive(),
      })),
    });
    
    const { error, value } = schema.validate(data);
  
    if (error) throw error;
  
    return value;
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
      status: 'Pendente',
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
      include: [includeUser, includeSeller, includeSaleProducts],
    });

    return allSales;
  },

  getBySaleId: async (id) => {
    const sale = await sales.findByPk(id, {
      attributes: { exclude: ['userId', 'sellerId'] },
      include: [includeUser, includeSeller, includeSaleProducts],
    });

    if (!sale) {
      const error = new Error(SALE_NOT_FOUND);
      error.name = 'NotFoundError';
      throw error;
    }

    return sale;
  },

  getByUserId: async (userId) => {
    const sale = await sales.findAll({ where: { userId } });

    if (!sale) {
      const error = new Error(SALE_NOT_FOUND);
      error.name = 'NotFoundError';
      throw error;
    }

    return sale;
  },

  getBySellerId: async (sellerId) => {
    const sale = await sales.findAll({ where: { sellerId } });

    if (!sale) {
      const error = new Error(SALE_NOT_FOUND);
      error.name = 'NotFoundError';
      throw error;
    }

    return sale;
  },

  update: async (saleId, changes) => {
    const sale = await salesProducts.findOne({ where: { saleId } });
    console.log(changes);
    if (!sale) {
      throw new Error(SALE_NOT_FOUND);
    }

    await Promise.all(changes
      .map((change) => {
        const { productId, quantity } = change;
        return saleService.updateSaleProducts(saleId, productId, quantity);
      }));
  },

  updateSaleProducts: async (saleId, productId, quantity) => {
    await salesProducts.update({ quantity }, {
      where: { [Op.and]: [{ saleId }, { productId }] },
    });
  },

  delete: async (id) => {
    const sale = await sales.findOne({ where: { id } });

    if (!sale) {
      throw new Error(SALE_NOT_FOUND);
    }

    await salesProducts.destroy({ where: { saleId: id } });
    await sale.destroy({ where: { id } });
  },
};

module.exports = saleService;
