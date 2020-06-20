import http from '../config/network';
export const fetchAllFoods = async () => {
  try {
    const res = await http.post('foods/get-many');
    return res.data.foods.foods;
  } catch (error) {
    return [];
  }
};
