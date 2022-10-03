import React, { useContext, useEffect, useState } from 'react';
import { BsCartPlus, BsCartDash } from 'react-icons/bs';
// import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import globalContext from '../../context/globalContext';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;
  const { addProductsForCalculator } = useContext(globalContext);
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setQuantity(value);
  };

  useEffect(() => {
    addProductsForCalculator({ ...product, quantity });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  // const notify = () => {
  //   toast(`${quantity} products are added to cart!`, {
  //     position: 'top-right',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div className="product-card">
      <h3
        className="product-name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </h3>
      <div className="product-container-img">
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <span
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$ ${String(price).replace('.', ',')}`}
      </span>
      <div className="product-container-info">
        <button
          className="dash-cart"
          type="button"
          onClick={ () => handleDecrement() }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          <BsCartDash className="bs-cart" />
        </button>
        <input
          className="add-cart-container"
          type="number"
          value={ quantity }
          min={ 0 }
          onChange={ handleChange }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
          className="plus-cart"
          type="button"
          onClick={ () => handleIncrement() }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          <BsCartPlus className="bs-cart" />
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  }).isRequired,
};
