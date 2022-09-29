import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Footer';
import Header from '../../components/Header';
import globalContext from '../../context/globalContext';
import { getSaleById, updateSaleStatus } from '../../services/api';
import dataFormatada from '../../services/utilities';

let statusDataTestId = 'seller_order_details__';
statusDataTestId = `${statusDataTestId}element-order-details-label-delivery-status`;

export default function OrdersDetails() {
//   const navigate = useNavigate();
  const { sellerSale, setSellerSale } = useContext(globalContext);

  const changeSaleStatus = async (id, status) => {
    try {
      await updateSaleStatus(id, status);
      const response = await getSaleById(id);
      setSellerSale(response);
    } catch (e) {
      console.log(e);
    //   localStorage.removeItem('user');
    //   navigate('/login');
    }
  };

  return (
    <div className="requests-container">
      <Header />
      <h2>Detalhes Pedido</h2>
      <div>
        <h4
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${sellerSale.id}` }
        </h4>
        <h4
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { `Data: ${dataFormatada(sellerSale.saleDate)}` }
        </h4>
        <h4
          data-testid={ statusDataTestId }
        >
          { sellerSale.status }
        </h4>
        <button
          type="button"
          disabled={
            sellerSale.status === 'Preparando' || sellerSale.status === 'Entregue'
          }
          onClick={ () => changeSaleStatus(sellerSale.id, 'Preparando') }
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          disabled={ sellerSale.status !== 'Preparando' }
          onClick={ () => changeSaleStatus(sellerSale.id, 'Em Trânsito') }
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
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
          sellerSale.saleProducts.map((prod, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                {prod.products.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {prod.quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$ ${prod.products.price.toString().replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$ ${(Number(prod.products.price) * Number(prod.quantity))
                  .toFixed(2).toString().replace('.', ',')}`}
              </td>
            </tr>
          ))
        }
      </table>
      <h3 data-testid="seller_order_details__element-order-total-price">
        {`Total: R$ ${sellerSale.totalPrice.toString().replace('.', ',')}`}
      </h3>
      <NavBar />
    </div>
  );
}
