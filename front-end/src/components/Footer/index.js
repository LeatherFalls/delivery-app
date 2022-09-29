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
  const user = JSON.parse(localStorage.getItem('user'));
  // const [disabled, setDisabled] = useState(false);

  const ordersPath = () => {
    if (user.role === 'seller') navigate('/seller/orders');
    if (user.role === 'customer') navigate('/customer/orders');
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {
          user.role === 'seller'
            ? (
              <input
                type="image"
                src={ order }
                alt="Order"
                data-testid="customer_products__element-navbar-link-orders"
                onClick={ ordersPath }
              />
            )
            : (
              <>
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
                  onClick={ ordersPath }
                />
                <button
                  type="submit"
                  data-testid="customer_products__button-cart"
                  onClick={ () => navigate('/customer/checkout') }
                  disabled={ Number(sumIsLife) === 0 }
                  style={ { width: '5%' } }
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
              </>
            )
        }
      </div>
    </footer>
  );
}
