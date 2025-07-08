import { API } from "../config/axios";

export const addQuestion = async (data:any) => {
  const res = await API.post("/questions", data);
  return res.data;
};

export const getAllQuestions = async () => {
  const res = await API.get("/questions");
  return res.data;
};
