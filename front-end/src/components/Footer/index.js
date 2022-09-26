import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../../assets/images/cart.svg';
import globalContext from '../../context/globalContext';
import home from '../../assets/images/home.svg';
import order from '../../assets/images/order-list.svg';
import profile from '../../assets/images/person.svg';
import './styles.css';

export default function NavBar() {
  const navigate = useNavigate();
  const { sumIsLife } = useContext(globalContext);
  // const [disabled, setDisabled] = useState(false);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <input
          type="image"
          src={ home }
          alt="Home"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
        />
        <input
          type="image"
          src={ order }
          alt="Order"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/orders') }
        />
        <button
          type="submit"
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ Number(sumIsLife) === 0 }
          style={ { width: '25%' } }
        >
          <img src={ cart } alt="cart" />
          <p data-testid="customer_products__checkout-bottom-value">
            {`R$ ${String(sumIsLife).replace('.', ',')}`}
          </p>
        </button>
        <input
          type="image"
          src={ profile }
          alt="Profile"
          onClick={ () => navigate('/customer/profile') }
        />
        {/* {
          disabled
            && (
              <>
                <input
                  type="image"
                  // src={ profile }
                  alt="Profile"
                  data-testid="customer_products__element-navbar-link-logout"
                  onClick={ () => navigate('/customer/profile') }
                />
                <input
                  type="image"
                  // src={ profile }
                  alt="Profile"
                  data-testid="customer_products__element-navbar-link-logout"
                  onClick={ () => navigate('/login') }
                />
              </>
            )
        } */}
      </div>
    </footer>
  );
}
