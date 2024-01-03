import axios from "axios";
import { SignUpData } from "./interfaces";

export const getCategories = async () => {
  const res = await axios.get(`/api/categories`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getIssues = async () => {
  const res = await axios.get("/api/issues");
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const createNewReport = async (formData: FormData) => {
  const res = await axios.post("/api/issues", formData);
  if (res.status !== 201) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getIconImage = async (url: string) => {
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.text();
};

export const getIssueById = async (id: string) => {
  const res = await axios.get(`/api/issues/${id}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const changeTheStatus = async (id: string, statusId: number) => {
  const res = await axios.patch(`/api/issues/${id}`, {
    statusId,
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteIssue = async (id: number, userId: string) => {
  const res = await axios.delete(`/api/issues/${id}`, { headers: { userId } });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res;
};

export const createNewProfile = async (data: SignUpData, userId: string) => {
  const res = await axios.post(`/api/profiles`, {
    email: data.user.email,
    userId,
  });
  if (res.status !== 201) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getProfileData = async (email: string) => {
  const res = await axios.get(`/api/profiles/${email}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
