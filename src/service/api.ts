import axios from 'axios';
const API_URL = import.meta.env.BACKEND_URL || 'https://taller-9s2l.onrender.com/api/v1';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(config => {

    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.withCredentials = true;
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
