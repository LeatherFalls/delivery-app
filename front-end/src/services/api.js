import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
  const response = await api({
    method: 'post',
    url: '/login',
    data: {
      email,
      password,
    },
  });
  console.log(response);

  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api({
    method: 'post',
    url: '/register',
    data: {
      name,
      email,
      password,
    },
  });

  console.log(response.data);

  return response.data;
};

export const getProducts = async () => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: '/products',
  });

  return response.data;
};

export default login;
