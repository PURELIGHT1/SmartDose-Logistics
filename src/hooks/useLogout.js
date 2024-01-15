import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../setup/store/useAuthStore';
import { ROUTES } from '../helper/constanta/routes';

const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        logout();
        queryClient.clear();
        navigate(ROUTES.LOGIN);
        window.location.reload();
    };

    return { handleLogout };
};

export default useLogout;
