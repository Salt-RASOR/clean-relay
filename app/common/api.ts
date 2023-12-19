import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(`/api/categories`);
  return res.data;
};
