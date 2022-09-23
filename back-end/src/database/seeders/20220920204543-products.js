'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: '../../images/skol-lata-250ml.jpg',
      }, 
      {
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: '../../images/heineken-600ml.jpg',
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: '../../images/antarctica-pilsen-300ml.jpg',
      },
      {
        name: 'Brahma 600ml',
        price: 7.50,
        url_image: '../../images/brahma-600ml.jpg',
      },
      {
        name: 'Skol 269ml',
        price: 2.19,
        url_image: '../../images/skol-269ml.jpg',
      },
      {
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        url_image: '../../images/skol-beats-senses-313ml.jpg',
      },
      {
        name: 'Becks 330ml',
        price: 4.99,
        url_image: '../../images/becks-330ml.jpg',
      },
      {
        name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        url_image: '../../images/brahma-duplo-malte-350ml.jpg',
      },
      {
        name: 'Becks 600ml',
        price: 8.89,
        url_image: '../../images/becks-600ml.jpg',
      },
      {
        name: 'Skol Beats Senses 269ml',
        price: 3.57,
        url_image: '../../images/skol-beats-senses-269ml.jpg',
      },
      {
        name: 'Stella Artois 275ml',
        price: 3.49,
        url_image: '../../images/stella-artois-275ml.jpg',
      }
    ])
  },

  async down (queryInterface, _Sequelize) {
   await queryInterface.bulkDelete('products', null, {});
  }
};
