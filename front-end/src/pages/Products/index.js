import React from 'react';
import NavBar from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import './styles.css';
import Header from '../../components/Header';

export default function Products() {
  return (
    <div className="products-container">
      <Header />
      <h3 className="products-text">Products</h3>
      <div className="products-main">
        <ProductCard />
      </div>
      <NavBar />
    </div>
  );
}
