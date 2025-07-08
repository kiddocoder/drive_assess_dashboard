import { useQuery } from "@tanstack/react-query"
import {getRoles} from "../../api/roles"


export const useFetchRoles = () => {
    return useQuery({
        queryKey:['roles'],
        queryFn:getRoles,
    })
}