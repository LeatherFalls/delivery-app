import React from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../../assets/images/search.svg';
import exit from '../../assets/images/exit.svg';
import './styles.css';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <header className="header-container">
      <div className="search-and-profile">
        <input
          type="image"
          src={ exit }
          alt="avatar"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        />
        <h5
          className="username"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name}
        </h5>
        <img src={ search } alt="search" className="header-search" />
      </div>
    </header>
  );
}
