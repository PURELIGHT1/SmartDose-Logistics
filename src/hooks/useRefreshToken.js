import api from '../setup/api/axiosConfig';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await api().API.post('/account/refresh-token');
        console.log('token :', response.data);
        Cookies.set('token', response.data);
        return response.data;
    };

    return refresh;
};

export default useRefreshToken;
