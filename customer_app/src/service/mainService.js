import http from '../config/network';

export const fetchPreview = async () => {
  try {
    const res = await http.post('categories/get-many', {
      limit: 10,
      offset: 0,
    });
    return res.data.categories;
  } catch (error) {
    return [];
  }
};
