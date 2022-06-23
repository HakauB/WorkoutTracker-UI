import { axios } from '../../../lib/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
    email: string;
    password: string;
};

export const login = (data: LoginCredentialsDTO): Promise<UserResponse> => {
    return axios.post('/dj_rest_auth/login/', data);
}