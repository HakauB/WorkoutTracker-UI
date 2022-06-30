import { initReactQueryAuth } from "react-query-auth";

import { Spin } from "antd";
import {
    login,
    getUser,
    register,
    UserResponse,
    LoginCredentialsDTO,
    RegisterCredentialsDTO,
    AuthUser
} from '../features/auth';
import storage from "../utils/storage";

async function handleUserResponse(data: UserResponse) {
    const { access_token, user } = data;
    storage.setToken(access_token);
    return user;
}

async function loadUser() {
    if (storage.getToken()) {
        const data = await getUser();
        return data;
    }
    return null;
}

async function loginFn(data: LoginCredentialsDTO) {
    const response = await login(data);
    const user = await handleUserResponse(response);
    return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
    const response = await register(data);
    const user = await handleUserResponse(response);
    return user;
}

async function logoutFn() {
    storage.clearToken();
    setTimeout(() => window.location.assign("/"), 2000);
    // window.location.assign(window.location.origin as unknown as string);
}

const authConfig = { 
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    LoaderComponent() {
        return (
            <Spin size="large" />
        )
    }
}

export const { AuthProvider, useAuth } = initReactQueryAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO
>(authConfig);