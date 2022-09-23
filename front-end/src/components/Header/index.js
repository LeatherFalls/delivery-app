import React from 'react';
import search from '../../assets/images/search.svg';
import menu from '../../assets/images/menu.svg';

export default function Header() {
  const teste = JSON.parse(localStorage.getItem('user'));
  console.log(teste);
  return (
    <header className="header-container">
      <div className="search-and-profile">
        <img src={ menu } alt="avatar" />
        <h5
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {teste.name}
        </h5>
        <img src={ search } alt="search" />
      </div>
    </header>
  );
}
