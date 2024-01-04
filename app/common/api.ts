import axios from "axios";
import { SignUpData, CredentialData, AuthData } from "./interfaces";
import getAuthHeaders from "../utils/getAuthHeaders";

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

export const getIssuesByUser = async (userId: string, authData: AuthData) => {
  const res = await axios.get(
    `/api/issues/byUser/${userId}`,
    getAuthHeaders(authData)
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const createNewReport = async (
  formData: FormData,
  authData: AuthData
) => {
  const res = await axios.post(
    "/api/issues",
    formData,
    getAuthHeaders(authData)
  );
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

export const changeTheStatus = async ({
  id,
  statusId,
  authData,
}: {
  id: string;
  statusId: number;
  authData: AuthData;
}) => {
  const res = await axios.patch(
    `/api/issues/${id}`,
    {
      statusId,
    },
    getAuthHeaders(authData)
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteIssue = async (id: number, authData: AuthData) => {
  const res = await axios.delete(`/api/issues/${id}`, getAuthHeaders(authData));
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res;
};

export const completeIssue = async (id: number, authData: AuthData) => {
  const res = await axios.delete(
    `/api/issues/${id}?complete=true`,
    getAuthHeaders(authData)
  );
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

export const getProfileData = async (authData: AuthData) => {
  const res = await axios.get(
    `/api/profiles/${authData.email}`,
    getAuthHeaders(authData)
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const updateUserCredentials = async (
  data: CredentialData,
  authData: AuthData
) => {
  const res = await axios.patch(
    `/api/profiles/${authData.email}`,
    data,
    getAuthHeaders(authData)
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteProfile = async (authData: AuthData) => {
  const res = await axios.delete(
    `/api/profiles/${authData.email}`,
    getAuthHeaders(authData)
  );
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
