import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTests,addQuestionsToTest,getTestQuestions } from "../../api/tests";

export const useFetchAllTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: getAllTests,
  });
};


export const useAddQuestionsToTest = ()=>{
  const query = useQueryClient()
  return useMutation({
    mutationFn:addQuestionsToTest,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:['questions','tests']})
    }
  })
}

export const useFetchTestQuestions = (id:any) => {
  console.log(id)
    return useQuery({
    queryKey: ["tests",id],
    queryFn: ()=>getTestQuestions(id),
    enabled:!!id
  });
}