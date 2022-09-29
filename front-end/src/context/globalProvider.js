import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import globalContext from './globalContext';
import { deleteUser, getUsers } from '../services/api';

function MyProvider({ children }) {
  const { Provider } = globalContext;
  const [products, setProducts] = useState([]);
  const [sumIsLife, setSum] = useState(0);
  const [users, setUsers] = useState([]);

  const renderUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response);
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log(response);
      renderUsers();
    } catch (e) {
      console.log(e);
    }
  };

  // const addProductsForCalculator = (product) => {
  //   if (product.quantity > 0 && product.status === 'increment') {
  //     setProducts([...products, product]);
  //     setSum(sumIsLife + (Number(product.price) * product.quantity));
  //   }
  //   if (product.quantity >= 0 && product.status === 'decrement') {
  //     setSum(sumIsLife - (Number(product.price) * (product.quantity + 1)));
  //   }
  //   console.log(sumIsLife);
  // };

  const addProductsForCalculator = (product) => {
    const ifExist = products.some((item) => item.id === product.id);
    if (!ifExist && product.quantity > 0) {
      setProducts([...products, product]);
    }
    const teste = products.filter((item) => item.id !== product.id);
    if (product.quantity === 0) {
      setProducts([...teste]);
    }
    setProducts([...teste, product]);
  };

  const calculatorProducts = () => {
    const sum = products.reduce((acc, curr) => {
      const { quantity, price } = curr;
      return acc + (quantity * price);
    }, 0);
    setSum(sum.toFixed(2));
  };

  useEffect(() => {
    calculatorProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const value = {
    products,
    sumIsLife,
    addProductsForCalculator,
    users,
    renderUsers,
    deleteUsers,
  };

  return (
    <Provider value={ value }>
      {children}
    </Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
