import { API } from "../config/axios";

export const getAllTests = async () => {
  const res = await API.get("/tests");
  return res.data;
};


export const addQuestionsToTest = async (data:any)=>{
  const res = await API.post(`tests/${data.testId}/questions`,data);
  return res.data;
};

export const getTestQuestions = async (id:any) => {
  const res = await API.get(`tests/${id}/questions`);
  return res.data;
};
