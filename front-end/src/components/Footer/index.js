import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillBagCheckFill,
  BsFillHouseDoorFill,
  BsPersonCircle,
  BsCart,
  BsCartFill } from 'react-icons/bs';
// import cart from '../../assets/images/cart.svg';
import globalContext from '../../context/globalContext';
// import home from '../../assets/images/home.svg';
// import order from '../../assets/images/order-list.svg';
// import profile from '../../assets/images/person.svg';
import './styles.css';

export default function NavBar() {
  const navigate = useNavigate();
  const { sumIsLife } = useContext(globalContext);
  const user = JSON.parse(localStorage.getItem('user'));

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
              <button
                type="button"
                data-testid="customer_products__element-navbar-link-orders"
                className="button-sales"
                onClick={ ordersPath }
              >
                <BsFillBagCheckFill />
              </button>
            )
            : (
              <>
                <button
                  type="button"
                  data-testid="customer_products__element-navbar-link-products"
                  className="button-footer"
                  onClick={ () => navigate('/customer/products') }
                >
                  <BsFillHouseDoorFill />
                </button>
                <button
                  type="button"
                  data-testid="customer_products__element-navbar-link-orders"
                  className="button-footer"
                  onClick={ ordersPath }
                >
                  <BsFillBagCheckFill />
                </button>
                <button
                  type="submit"
                  data-testid="customer_products__button-cart"
                  onClick={ () => navigate('/customer/checkout') }
                  disabled={ Number(sumIsLife) === 0 }
                  className="button-footer"
                  // style={ { width: '5%' } }
                >
                  {
                    Number(sumIsLife) === 0
                      ? (
                        <BsCart />
                      )
                      : (
                        <div className="box-full-cart">
                          <BsCartFill className="full-cart" />
                          <p
                            data-testid="customer_products__checkout-bottom-value"
                            className="value-cart"
                          >
                            {`R$ ${String(sumIsLife).replace('.', ',')}`}
                          </p>
                        </div>
                      )
                  }
                </button>
                <button
                  type="button"
                  className="button-footer"
                  onClick={ () => navigate('/customer/profile') }
                >
                  <BsPersonCircle />
                </button>
              </>
            )
        }
      </div>
    </footer>
  );
}
