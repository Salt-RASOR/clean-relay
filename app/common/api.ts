import axios from "axios";
import { SignUpData } from "./interfaces";

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

export const getIssueById = async (id: string) => {
  const res = await axios.get(`/api/issues/${id}`);
  return res.data;
};

export const changeTheStatus = async (id: string, statusId: number) => {
  const res = await axios.patch(`/api/issues/${id}`, {
    statusId,
  });
  return res.data;
};

export const deleteIssue = async (id: number) => {
  const res = await axios.delete(`/api/issues/${id}`);
  return res;
};

export const createNewProfile = async (data: SignUpData, userId: string) => {
  const res = await axios.post(`/api/profiles`, {
    email: data.user.email,
    userId,
  });
  return res.data;
};

export const getProfileData = async (email: string) => {
  const res = await axios.get(`/api/profiles/${email}`);
  return res.data;
};
