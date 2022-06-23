import { axios } from "../../../lib/axios";

import { AuthUser, UserResponse } from "../types";

export const getUser = (): Promise<AuthUser> => {
    return axios.get('/dj_rest_auth/user/');
}