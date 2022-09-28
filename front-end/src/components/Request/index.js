import React from 'react';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import globalContext from '../../context/globalContext';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import dataFormatada from '../../services/utilities';

export default function Request({ sale }) {
  const { id, status, saleDate, totalPrice } = sale;
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="request"
      onClick={ () => navigate(`/customer/orders/${id}`) }
      style={ { width: '10%' } }
    >
      <div className="request-number">
        <span>Pedido </span>
        <span data-testid={ `customer_orders__element-order-id-${id}` }>
          {id}
        </span>
      </div>
      <div className="request-status">
        <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
          {status}
        </span>
      </div>
      <div className="request-info">
        <div className="request-date">
          <span>Data Pedido </span>
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            {dataFormatada(saleDate)}
          </span>
        </div>
        <div className="request-value">
          <span>Valor Pedido </span>
          <span data-testid={ `customer_orders__element-card-price-${id}` }>
            {`R$ ${String(totalPrice).replace('.', ',')}`}
          </span>
        </div>
      </div>
    </button>
  );
}

Request.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    saleDate: PropTypes.instanceOf(Date),
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
