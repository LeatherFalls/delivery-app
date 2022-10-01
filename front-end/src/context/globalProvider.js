import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import globalContext from './globalContext';
import { deleteUser, getUsers, getSaleById, updateSaleStatus } from '../services/api';

function MyProvider({ children }) {
  const { Provider } = globalContext;
  const [products, setProducts] = useState([]);
  const [sumIsLife, setSum] = useState(0);
  const [users, setUsers] = useState([]);
  const [querySale, setQuerySale] = useState({});
  const navigate = useNavigate();

  const renderUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUsers = async (id) => {
    try {
      await deleteUser(id);
      renderUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const addProductsForCalculator = (product) => {
    const ifExist = products.some((item) => item.id === product.id);
    if (!ifExist && product.quantity > 0) {
      setProducts([...products, product]);
    }
    const teste = products.filter((item) => item.id !== product.id);
    if (product.quantity === 0) {
      setProducts([...teste]);
    } else {
      setProducts([...teste, product]);
    }
  };

  const calculatorProducts = () => {
    const sum = products.reduce((acc, curr) => {
      const { quantity, price } = curr;
      return acc + (quantity * price);
    }, 0);
    setSum(sum.toFixed(2));
  };

  const getSale = async (saleId, type) => {
    try {
      const response = await getSaleById(saleId);
      console.log(response);
      setQuerySale(response);
      if (type === 'user') {
        navigate(`/customer/orders/${saleId}`);
      } else {
        navigate(`/seller/orders/${saleId}`);
      }
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const changeSaleStatus = async (id, status = 'Entregue') => {
    try {
      await updateSaleStatus(id, status);
      const response = await getSaleById(id);
      setQuerySale(response);
    } catch (e) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  useEffect(() => {
    calculatorProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const value = {
    products,
    sumIsLife,
    setProducts,
    addProductsForCalculator,
    users,
    renderUsers,
    deleteUsers,
    querySale,
    setQuerySale,
    getSale,
    changeSaleStatus,
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
