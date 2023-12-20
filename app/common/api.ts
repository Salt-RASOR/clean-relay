import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(`/api/categories`);
  return res.data;
};

export const getIssues = async () => {
  const res = await axios.get("/api/issues");
  return res.data;
};

export const createNewReport = async (formData: FormData) => {
  const res = await axios.post("/api/issues", formData);
  return res.data;
};

export const getIconImage = async (url: string) => {
  const res = await fetch(url);
  return res.text();
};
