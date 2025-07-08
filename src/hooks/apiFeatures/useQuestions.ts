import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addQuestion, getAllQuestions } from "../../api/questions";

export const useCreateQuestion = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useFetchQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
  });
};
