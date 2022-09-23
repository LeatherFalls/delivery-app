'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'sales',
          key: 'id'
        },
        field: 'sale_id'
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'products',
          key: 'id'
        },
        field: 'product_id'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};
