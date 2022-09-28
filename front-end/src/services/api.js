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

  return response.data;
};

export const registerByAdmin = async (name, email, password, role) => {
  const response = await api({
    method: 'post',
    url: '/register/admin',
    data: {
      name,
      email,
      password,
      role,
    },
  });

  console.log(response.data);

  return response.data;
};

export const getProducts = async () => {
  console.log(JSON.parse(localStorage.getItem('user')).token);
  const response = await api({
    method: 'get',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: '/products',
  });

  return response.data;
};

export const postSeller = async (obj) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, productsSale } = obj;
  const response = await api({
    method: 'post',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: '/sales',
    data: {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      productsSale,
    },
  });

  return response.data;
};

export const getSaller = async () => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: '/sales',
  });

  return response.data;
};

export const getUsers = async () => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: '/users',
  });

  return response.data;
};

export const getSallerById = async (id) => {
  const response = await api({
    method: 'get',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: `/sales/${id}`,
  });

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api({
    method: 'delete',
    headers: {
      authorization: JSON.parse(localStorage.getItem('user')).token,
    },
    url: `/users/${id}`,
  });

  return response.data;
};

export default login;
