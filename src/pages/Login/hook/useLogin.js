import useLocalStorage from "../../../hooks/useLocalStorage";
import useAuthStore from "../../../setup/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import * as api from '../../../setup/api/auth';
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const useLogin = () => {
    const { setValue } = useLocalStorage('user', null);
    const setUser = useAuthStore((state) => state.setUser);
    return useMutation(api.login, {
        onSuccess: (data) => {
            if (data) {
                // console.log(data.data.data);
                const user = data.data.data.account;
                Cookies.set('token', data.data.data.token);
                setUser(user);
                setValue(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    text: 'Welcome to Dashboard',
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
        },
        onError: () => {
           
        },
    });
};

export default useLogin;