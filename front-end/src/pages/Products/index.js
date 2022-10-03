import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillBasket2Fill } from 'react-icons/bs';
import globalContext from '../../context/globalContext';
import NavBar from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import './styles.css';
import Header from '../../components/Header';
import { getProducts } from '../../services/api';

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  console.log(produtos);

  const { sumIsLife } = useContext(globalContext);

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
    <div>
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
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ Number(sumIsLife) === 0 }
      >
        <div className="box-full-cart">
          <BsFillBasket2Fill />
          {/*           {
            Number(sumIsLife) !== 0
            && (
              <p
                data-testid="customer_products__checkout-bottom-value"
                className="test"
              >
                {`R$ ${String(sumIsLife).replace('.', ',')}`}
              </p>
            )
          } */}
        </div>
      </button>
      <NavBar />
    </div>
  );
}
