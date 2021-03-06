import http from '../config/network';

export const requestLogin = async userData => {
  try {
    const res = await http.post('users/login', userData);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const requestSignup = async userData => {
  try {
    const res = await http.post('users', userData);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
