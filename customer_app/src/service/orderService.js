import http from '../config/network';

export const fetchAllOrders = async () => {
  try {
    const res = await http.post('carts/get-many');
    console.log('res', res.data);
    return res.data.carts;
  } catch (error) {
    return [];
  }
};

export const fetchOrderDetail = async orderId => {
  try {
    const res = await http.post('carts/get', {
      cart_id: orderId,
    });
    return res.data.cart;
  } catch (error) {
    return [];
  }
};

export const formatCurrency = (n, separate = '.') => {
  try {
    if (!n) n = 0;
    var s = typeof n === 'number' ? parseInt(n).toString() : '0';
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, separate);
    return ret;
  } catch (error) {
    return '0';
  }
};
export const cancelOrder = async data => {
  try {
    const res = await http.put('carts', data);
    return res.data.cart;
  } catch (error) {
    return [];
  }
};
