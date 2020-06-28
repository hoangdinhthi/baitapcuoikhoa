import http from '../config/network';
export const fetchAllFoods = async () => {
  try {
    const res = await http.post('foods/get-many');
    return res.data.foods.foods;
  } catch (error) {
    return [];
  }
};

export const checkout = async (user_id, data) => {
  try {
    console.log(data);

    const payload = {
      cart: {
        ...data,
        user: user_id,

        status: 1,
      },
    };
    const res = await http.post('carts', payload);
    console.log(res);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
