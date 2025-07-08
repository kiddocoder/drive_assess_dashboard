import { useQuery } from "@tanstack/react-query";
import { getAllTests } from "../../api/tests";

export const useFetchAllTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: getAllTests,
  });
};
