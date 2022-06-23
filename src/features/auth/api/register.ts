import { axios } from "../../../lib/axios";

import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
    email: string;
    password: string;
}

export const register = (
    data: RegisterCredentialsDTO
): Promise<UserResponse> => {
    return axios.post("/dj_rest_auth/registration/", data);
}