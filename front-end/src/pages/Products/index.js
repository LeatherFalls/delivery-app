import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import './styles.css';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';

export default function Products() {
  const [produtos, setProdutos] = useState([]);

  const products = async () => {
    try {
      const response = await getProducts();
      console.log(response);
      setProdutos(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    products();
  }, []);
  return (
    <div className="products-container">
      <Header />
      <h3 className="products-text">Products</h3>
      <div className="products-main">
        {
          produtos.map((produto, index) => (
            <ProductCard
              key={ index }
              product={ produto }
            />
          ))
        }
      </div>
      <NavBar />
    </div>
  );
}
