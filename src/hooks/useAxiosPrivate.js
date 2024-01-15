import useRefreshToken from './useRefreshToken';
import api from '../setup/api/axiosConfig';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
    const token = Cookies.get('token');
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = api().API.interceptors.request.use(
            async (config) => {
                if (!config.headers['authorization']) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = api().API.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('nACT', newAccessToken);

                    prevRequest.headers = {
                        ...prevRequest.headers,
                        authorization: `${newAccessToken}`,
                    };
                    return api(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api().API.interceptors.request.eject(requestInterceptor);
            api().API.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, token]);

    return api().API;
};

export default useAxiosPrivate;
