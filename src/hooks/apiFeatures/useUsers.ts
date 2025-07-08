import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers,createUser ,fetchAllStudents, fetchAllAdmins} from "../../api/users";

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
};

export const useFetchAllStudents = () => {
 return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllStudents,
  });
};

export const useFetchAllAdmins = () => {
 return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllAdmins,
  });
};

export const useAddUser = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn:createUser,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:['users','students','admins','instractors']})
    }
  })
}