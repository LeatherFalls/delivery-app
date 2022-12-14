import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Footer';
import Request from '../../components/Request';
import Header from '../../components/Header';
import { getSallerByUserId } from '../../services/api';
import './styles.css';

export default function Orders() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const salesUser = async () => {
    try {
      const response = await getSallerByUserId(user.id);
      setSales(response);
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  useEffect(() => {
    salesUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="requests-container">
      <Header />
      <div className="requests-orders">
        {
          sales.map((sale, index) => (
            <Request
              key={ index }
              sale={ sale }
            />
          ))
        }
      </div>
      <NavBar />
    </div>
  );
}
