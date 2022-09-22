import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import hamburguer from '../../assets/images/hamburguer.png';
import star from '../../assets/images/star-fav.svg';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loading';

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
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
      {!loader ? <Loader /> : (
        <>
          <div className="product-container-img">
            <img src={ hamburguer } alt="hamburguer" />
          </div>
          <div className="product-container-info">
            <h3 className="product-name">Cheese Burger</h3>
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
                R$ 20.00
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
        </>
      )}
    </div>
  );
}
