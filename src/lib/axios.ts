import Axios, { AxiosRequestConfig } from 'axios';

import { openNotification } from '../components/Notifications/Notifications';
import storage from '../utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
    const token = storage.getToken();
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    config.headers!.Accept = 'application/json';
    return config;
}

export const axios = Axios.create({
    baseURL: 'http://localhost:8000'
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        if (error.response.status === 401) {
            storage.clearToken();
        }
        openNotification({title: 'Error', message: message, type: 'error'});
        return Promise.reject(error);
    }
)