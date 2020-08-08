import axios from 'axios';
import Storage from './storage';

const http = axios.create({
  baseURL: 'http://192.168.11.149:3000/api/v1/',
  timeout: 180000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  async function(config) {
    const userDataString = await Storage.getToken();
    if (userDataString) {
      const userDataJson = JSON.parse(userDataString);
      config.headers.Authorization = `Bearer ${userDataJson.token}`;
    }
    return Promise.resolve(config);
  },
  function(error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log('error');
    return Promise.reject(error);
  },
);

export default http;
