import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import star from '../../assets/images/star-fav.svg';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loading';
import { getProducts } from '../../services/api';

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);
  const [produtos, setProdutos] = useState([]);

  const [loader, setRemoveLoader] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const aaa = 2000;

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
    setTimeout(() => {
      setRemoveLoader(true);
    }, aaa);
  }, []);

  const notify = () => {
    toast(`${quantity} products are added to cart!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="product-card">
      {!loader ? <Loader />
        : produtos.map((product) => (
          <div key={ product.id }>
            <div className="product-container-img">
              <img src="../../images/becks_600ml" alt={ product.name } />
            </div>
            <div className="product-container-info">
              <h3 className="product-name">{ product.name }</h3>
              <div className="rating">
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
              </div>
              <div className="add-cart-container">
                <button type="button" onClick={ () => handleDecrement() }>-</button>
                <span>{ quantity }</span>
                <button type="button" onClick={ () => handleIncrement() }>+</button>
              </div>
              <div className="product-value">
                <span>
                  {product.price}
                </span>
              </div>
              <button
                className="finish-order"
                type="button"
                onClick={ () => notify() }
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
