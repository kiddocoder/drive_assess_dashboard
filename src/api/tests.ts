import { API } from "../config/axios";

export const getAllTests = async () => {
  const res = await API.get("/tests");
  return res.data;
};
