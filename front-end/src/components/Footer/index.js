import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../../assets/images/cart.svg';
import home from '../../assets/images/home.svg';
import order from '../../assets/images/order-list.svg';
import profile from '../../assets/images/person.svg';
import './styles.css';

export default function NavBar() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

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
        <input
          type="image"
          src={ cart }
          alt="Cart"
          // onClick={ () => navigate('/customer/checkout') }
        />
        <input
          type="image"
          src={ profile }
          alt="Profile"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => setDisabled(!disabled) }
        />
        {
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
        }
      </div>
    </footer>
  );
}
