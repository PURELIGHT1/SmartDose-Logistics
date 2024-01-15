import axios from 'axios';
import Cookies from 'js-cookie';

const api = () => {
    const token = Cookies.get('token');
    const headers = token ? { authorization: `Bearer ${token}` } : {};

    const API = axios.create({
        baseURL: 'http://localhost:8084/api/',
        headers: {
            ...headers
        },
    });

    const APILOGIN = axios.create({
        baseURL: 'http://localhost:8084/api/',
    });

    return {
        API,
        APILOGIN
    };
}


export default api;
