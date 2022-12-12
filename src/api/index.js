import axios from 'axios';
//http://localhost:5000
//https://yoga-classes-backend-royalpreet.onrender.com
const API = axios.create({ baseURL: 'https://yoga-classes-backend-royalpreet.onrender.com' });

API.interceptors.request.use(async function (config) {
  const tkn = await localStorage.getItem('token');
  const token = JSON.parse(tkn);

  config.headers.authorization = token ? `Bearer ${token}` : null;
  return config;
});

export default API;
