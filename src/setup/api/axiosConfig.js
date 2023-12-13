import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8084/api/',
    headers: {
        authorization: Cookies.get('token') || '',
    },
});

export default api;
