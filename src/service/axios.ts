import axios from 'axios';
import { getEnvVariable } from '@/helpers';

const API_URL = getEnvVariable();

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});

axiosInstance.interceptors.request.use(config => {
    config.withCredentials = true;

    const token = localStorage.getItem('x-token');
    const uid = localStorage.getItem('user-id');

    if (token && uid) {
        config.headers['x-token'] = token;
        config.headers['user-id'] = uid;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        console.error('API Error:', error.response?.data || error.message);
        const rejectionReason = error instanceof Error ? error : new Error(error.response?.data || error.message || 'Unknown error');
        return Promise.reject(rejectionReason);
    }
);
