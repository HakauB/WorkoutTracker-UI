import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";

import { User } from "../types";

export const getUsers = (): Promise<User[]> => {
    return axios.get('/users/');
}

export const useUsers = () => {
    return useQuery(
        'users',
        getUsers
    );
}