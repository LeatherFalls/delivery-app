import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../../context/globalContext';
import dataFormatada from '../../services/utilities';
import '../Request/styles.css';

export default function RequestSeller({ sale }) {
  const { getSale } = useContext(globalContext);
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const maskNumberSale = 4;

  return (
    <button
      type="button"
      className="request"
      onClick={ () => getSale(id, 'seller') }
    >
      <div className="request-number">
        <span>Pedido </span>
        <span data-testid={ `seller_orders__element-order-id-${id}` }>
          {id.toString().padStart(maskNumberSale, '0')}
        </span>
      </div>
      <div className="request-status">
        <span data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </span>
      </div>
      <div className="request-info">
        <div className="request-date">
          <span>Data Pedido </span>
          <span data-testid={ `seller_orders__element-order-date-${id}` }>
            {dataFormatada(saleDate)}
          </span>
        </div>
        <div className="request-value">
          <span>Valor Pedido </span>
          <span data-testid={ `seller_orders__element-card-price-${id}` }>
            {`R$ ${String(totalPrice).replace('.', ',')}`}
          </span>
        </div>
        <div className="request-value">
          <span data-testid={ `seller_orders__element-card-address-${id}` }>
            {deliveryAddress}
            ,
            {' '}
            {deliveryNumber}
          </span>
        </div>
      </div>
    </button>
  );
}

RequestSeller.propTypes = {
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
