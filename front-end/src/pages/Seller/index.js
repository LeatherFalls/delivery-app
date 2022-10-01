import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getSallerBySellerId } from '../../services/api';
import RequestSeller from '../../components/RequestSeller';

export default function Seller() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  const salesSeller = async () => {
    try {
      const response = await getSallerBySellerId(user.id);
      setSales(response);
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  useEffect(() => {
    salesSeller();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {
        sales.map((sale, index) => (
          <RequestSeller
            key={ index }
            sale={ sale }
          />
        ))
      }
      <Footer />
    </div>
  );
}
