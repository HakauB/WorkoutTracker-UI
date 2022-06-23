import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";

import { User } from "../types";

export const getUser = (id: string): Promise<User> => {
    return axios.get(`/users/${id}/`);
}

export const useUser = (id: string) => {
    return useQuery(
        ['users', id],
        () => getUser(id)
    )
}