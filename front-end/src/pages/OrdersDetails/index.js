import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Footer';
import Header from '../../components/Header';
import globalContext from '../../context/globalContext';
import dataFormatada from '../../services/utilities';
import { updateSaleStatus, getSaleById } from '../../services/api';
// import './styles.css';

let statusDataTestId = 'customer_order_details__';
statusDataTestId = `${statusDataTestId}element-order-details-label-delivery-status`;

export default function OrdersDetails() {
  const navigate = useNavigate();
  const { userSale, setUserSale } = useContext(globalContext);

  const changeSaleStatus = async (id) => {
    try {
      const status = 'Entregue';
      await updateSaleStatus(id, status);
      const response = await getSaleById(id);
      setUserSale(response);
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className="requests-container">
      <Header />
      <h2>Detalhes Pedido</h2>
      <div>
        <h4
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${userSale.id}` }
        </h4>
        <h4
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P. Vendedor: ${userSale.seller.name}` }
        </h4>
        <h4
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { `Data: ${dataFormatada(userSale.saleDate)}` }
        </h4>
        <h4
          data-testid={ statusDataTestId }
        >
          { userSale.status }
        </h4>
        <button
          type="button"
          disabled={ userSale.status !== 'Em Trânsito' }
          onClick={ () => changeSaleStatus(userSale.id) }
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        {
          userSale.saleProducts.map((prod, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {prod.products.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {prod.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$ ${prod.products.price.toString().replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$ ${(Number(prod.products.price) * Number(prod.quantity))
                  .toFixed(2).toString().replace('.', ',')}`}
              </td>
            </tr>
          ))
        }
      </table>
      <h3 data-testid="customer_order_details__element-order-total-price">
        {`Total: R$ ${userSale.totalPrice.toString().replace('.', ',')}`}
      </h3>
      <NavBar />
    </div>
  );
}
