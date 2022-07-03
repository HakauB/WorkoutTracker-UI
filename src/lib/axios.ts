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
    baseURL: 'http://127.0.0.1:8000',
});

const parseErrorResponseData = (error: any) => {
    if (error.response?.data) {
        return Object.entries(error.response.data).map(([key, value]) => {
            return value;
        });
    }
    return error.message;
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = parseErrorResponseData(error)// || error.message;
        // TODO: Actually want to do this?
        if (error.response.status === 401) {
            storage.clearToken();
        }
        openNotification({title: 'Error', message: message, type: 'error'});
        return Promise.reject(error);
    }
)