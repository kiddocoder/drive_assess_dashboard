import { API } from "../config/axios";

export const fetchAllCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};
