import http from '../config/network';

export const requestLogin = async userData => {
  try {
    const res = await http.post('users/login', userData);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
