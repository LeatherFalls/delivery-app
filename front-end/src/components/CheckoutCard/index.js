import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../../context/globalContext';
import { getSaleById, getUsers, postSeller } from '../../services/api';

export default function CheckoutCard() {
  const { products, sumIsLife, setProducts, setQuerySale } = useContext(globalContext);
  const [address, setAdrees] = useState('');
  const [number, setNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellectedId, setSellectedId] = useState('');
  console.log(sellectedId);

  const navigate = useNavigate();

  const removeProduct = (id) => {
    const teste = products.filter((item) => item.id !== id);
    setProducts(teste);
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'address') {
      setAdrees(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      const sellerss = users.filter((user) => user.role === 'seller');
      setSellers(sellerss);
    };
    fetchUsers();
  }, []);

  const sellerPost = async () => {
    const idUser = JSON.parse(localStorage.getItem('user')).id;
    const productsVendas = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    const body = {
      userId: idUser,
      sellerId: Number(sellectedId),
      totalPrice: sumIsLife,
      deliveryAddress: address,
      deliveryNumber: String(number),
      productsSale: productsVendas,
    };
    try {
      const newSeller = await postSeller(body);
      const response = await getSaleById(newSeller.id);
      setQuerySale(response);
      setProducts([]);
      navigate(`/customer/orders/${newSeller.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    sellerPost();
    console.log(number, address);
  };

  return (
    <div>
      <h4>Finalizar Pedido</h4>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        {
          products.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
                {product.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {product.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {`R$ ${product.price.toString().replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`R$ ${(product.price * product.quantity)
                  .toFixed(2).toString().replace('.', ',')}`}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  onClick={ () => removeProduct(product.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))
        }
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">
        {`Total: R$ ${sumIsLife.toString().replace('.', ',')}`}
      </h3>
      <div>
        <label htmlFor="1">
          P.Vendedora Responsavel
          <select
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target: { value } }) => setSellectedId(value) }
            id="1"
          >
            <option>
              Choose Your Option
            </option>
            {
              sellers.map((seller, index) => (
                <option
                  key={ index }
                  value={ seller.id }
                >
                  {seller.name}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="endereço">
          Endereço
          <input
            type="text"
            name="address"
            placeholder="Digite seu endereço"
            data-testid="customer_checkout__input-address"
            id="endereço"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            type="number"
            name="number"
            placeholder="Digite seu número"
            data-testid="customer_checkout__input-address-number"
            id="numero"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleClick }
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
