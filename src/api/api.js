import axios from 'axios';
//import { getEnvVariable } from '../helpers';

const API_URL = 'https://api-lulu-notes.onrender.com/api/';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('x-token'),
        'user-id': localStorage.getItem('user-id')
    }

    return config;
});

export default api;