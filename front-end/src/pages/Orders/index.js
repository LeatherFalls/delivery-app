import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Footer';
import Request from '../../components/Request';
import './styles.css';
import Header from '../../components/Header';
import { getSalesByUserId } from '../../services/api';

export default function Orders() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  const salesUser = async () => {
    try {
      const response = await getSalesByUserId(user.id);
      setSales(response);
      console.log(response);
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
      <h3 className="requests-text">Pedidos</h3>
      <div className="requests-main" style={ { paddingBottom: '150px' } }>
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
