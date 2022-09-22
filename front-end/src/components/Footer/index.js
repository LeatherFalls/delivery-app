import React from 'react';
import cart from '../../assets/images/cart.svg';
import home from '../../assets/images/home.svg';
import order from '../../assets/images/order-list.svg';
import profile from '../../assets/images/person.svg';
import './styles.css';

export default function NavBar() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <img src={ home } alt="Home" />
        <img src={ order } alt="Order" />
        <img src={ cart } alt="Cart" />
        <img src={ profile } alt="Profile" />
      </div>
    </footer>
  );
}
