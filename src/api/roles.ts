import { API } from "../config/axios"


export const getRoles = async () => {
    const res = await API.get('/roles')
    return res.data;
}
