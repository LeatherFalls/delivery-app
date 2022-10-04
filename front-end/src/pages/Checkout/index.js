import React from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import NavBar from '../../components/Footer';
import Header from '../../components/Header';
import './styles.css';

export default function Checkout() {
  return (
    <div>
      <Header />
      <CheckoutCard />
      <NavBar />
    </div>
  );
}
