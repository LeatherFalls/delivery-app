import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import globalContext from '../../context/globalContext';
import { getSaleById } from '../../services/api';
import dataFormatada from '../../services/utilities';

export default function RequestSeller({ sale }) {
  const { setSellerSale } = useContext(globalContext);
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const navigate = useNavigate();

  const numeroMAGICOEUMAPORRA = 4;
  const getSale = async (saleId) => {
    try {
      const response = await getSaleById(saleId);
      setSellerSale(response);
    } catch (e) {
      console.log(e);
    //   localStorage.removeItem('user');
    //   navigate('/login');
    }
    navigate(`/seller/orders/${saleId}`);
  };
  return (
    <button
      type="button"
      className="request"
      onClick={ () => getSale(id) }
      style={ { width: '10%' } }
    >
      <div className="request-number">
        <span>Pedido </span>
        <span data-testid={ `seller_orders__element-order-id-${id}` }>
          {id.toString().padStart(numeroMAGICOEUMAPORRA, '0')}
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
