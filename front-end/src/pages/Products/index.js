import React from 'react';
import NavBar from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import search from '../../assets/images/search.svg';
import menu from '../../assets/images/menu.svg';
import './styles.css';

export default function Products() {
  return (
    <div className="products-container">
      <div className="search-and-profile">
        <img src={ menu } alt="avatar" />
        <img src={ search } alt="search" />
      </div>
      <h3 className="products-text">Products</h3>
      <div className="products-main">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <NavBar />
    </div>
  );
}
