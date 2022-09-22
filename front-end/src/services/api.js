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

export default login;
