import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../../context/globalContext';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import dataFormatada from '../../services/utilities';

export default function Request({ sale }) {
  const { getSale } = useContext(globalContext);
  const { id, status, saleDate, totalPrice } = sale;
  const maskNumberSale = 4;

  return (
    <button
      type="button"
      className="request"
      onClick={ () => getSale(id, 'user') }
      style={
        status === 'Pendente'
          ? { borderBottom: '1px solid rgb(211, 36, 36)' }
          : { borderBottom: '1px solid green' }
      }
    >
      <div className="request-number">
        <span>Pedido </span>
        <span data-testid={ `customer_orders__element-order-id-${id}` }>
          {id.toString().padStart(maskNumberSale, '0')}
        </span>
      </div>
      <div className="request-status">
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
          className="request-status-text"
        >
          {status}
        </span>
      </div>
      <div className="request-info">
        <div className="request-date">
          <span>Data Pedido: </span>
          <span data-testid={ `customer_orders__element-order-date-${id}` }>
            {dataFormatada(saleDate)}
          </span>
        </div>
        <div className="request-value">
          <span>Valor Pedido: </span>
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
    saleDate: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
