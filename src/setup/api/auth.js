import api from './axiosConfig';

export const login = async (data) => {
    try {
        const response = await api().APILOGIN.post('/account/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
