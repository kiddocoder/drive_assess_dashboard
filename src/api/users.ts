import { API } from "../config/axios";

export const fetchAllUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const fetchAllAdmins = async () => {
  const response = await API.get("/users/admins");
  return response.data;
};

export const fetchAllStudents  = async () => {
  const response = await API.get("/users/students");
  return response.data;
};

export const fetchUser = async (id:any) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id:any, data:any) => {
  const response = await API.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id:any) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};

export const createUser = async (data:any) => {
  const response = await API.post("/users", data);
  return response.data;
};
