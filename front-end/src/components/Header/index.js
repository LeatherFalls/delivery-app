import React from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../../assets/images/search.svg';
import menu from '../../assets/images/menu.svg';

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
          src={ menu }
          alt="avatar"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        />
        <h5
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name}
        </h5>
        <img src={ search } alt="search" />
      </div>
    </header>
  );
}
