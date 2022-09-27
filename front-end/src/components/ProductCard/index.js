import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
// import star from '../../assets/images/star-fav.svg';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from '../Loading';
// import { getProducts } from '../../services/api';

export default function ProductCard({ product }) {
  const { id, name, price, urlImage } = product;
  const [quantity, setQuantity] = useState(0);
  // const [loader, setRemoveLoader] = useState(false);

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
    <div>
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </h3>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <button
        type="button"
        onClick={ () => handleDecrement() }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        value={ quantity }
        min={ 0 }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ () => handleIncrement() }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
      <span
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$ ${String(price).replace('.', ',')}`}
      </span>
      <button
        type="button"
        onClick={ () => notify() }
      >
        Add to cart
      </button>

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
