import http from '../config/network';
export const fetchSlugFoods = async slugName => {
  try {
    const res = await http.post('categories/get', {
      slug: slugName,
    });
    return res.data.category.foods;
  } catch (error) {
    return [];
  }
};
