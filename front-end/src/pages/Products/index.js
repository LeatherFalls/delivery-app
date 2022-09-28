import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import './styles.css';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  const products = async () => {
    try {
      const response = await getProducts();
      console.log(response);
      setProdutos(response);
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };
  console.log(produtos);

  useEffect(() => {
    products();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="products-container">
      <Header />
      <h3 className="products-text">Products</h3>
      <div className="products-main" style={ { paddingBottom: '150px' } }>
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
