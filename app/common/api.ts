import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(`/api/categories`);
  return res.data;
};

export const getIssues = async () => {
  const res = await axios.get("/api/issues");
  return res.data;
};