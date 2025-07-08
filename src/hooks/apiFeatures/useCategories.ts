import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../../api/categories";

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllCategories,
  });
};
