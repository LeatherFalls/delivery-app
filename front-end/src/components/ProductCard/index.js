import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import star from '../../assets/images/star-fav.svg';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loading';
import { getProducts } from '../../services/api';

export default function ProductCard() {
  const [quantity, setQuantity] = useState(0);
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

  const handleChange = ({ target: { value } }) => {
    setQuantity(Number(value));
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
        : produtos.map(({ id, name, price, urlImage }) => (
          <div key={ id }>
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
            {/* <div className="rating">
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
                <img src={ star } alt="star" />
              </div> */}
            <button
              type="button"
              onClick={ () => handleDecrement() }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              -
            </button>
            <input
              type="number"
              value={ Number(quantity) }
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
              {price}
            </span>
            <button
              type="button"
              onClick={ () => notify() }
            >
              Add to cart
            </button>
          </div>
        ))}
    </div>
  );
}
