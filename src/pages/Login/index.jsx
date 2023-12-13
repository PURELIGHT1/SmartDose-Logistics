import { useLocation, useNavigate } from 'react-router-dom';
import BgLogin from '../../assets/img/bg-login.svg';
import { useForm } from 'react-hook-form';
import useAuthStore from '../../setup/store/useAuthStore';
import useLogin from './hook/useLogin';
import { ROUTES } from '../../helper/constanta/routes';
import { useEffect } from 'react';
import Button from '../../components/Button';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const user = useAuthStore((state) => state.user);

    const { mutate, isLoading } = useLogin();

    const onSubmit = (data) => {
        mutate(data);
    };

    const redirectPath = location.state?.from || ROUTES.DASHBOARD;

    useEffect(() => {
        if (user) {
            navigate(redirectPath);
        }
    }, [user, navigate, redirectPath]);

    if (user) return;
    return (
        <div className="mx-auto max-h-[700px] max-w-7xl w-screen h-screen overflow-hidden">
            <div className="grid grid-cols-12 w-full h-full">
                <div className="hidden md:block md:col-span-5">
                    <img
                        src={BgLogin}
                        alt="login bg"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="col-span-12 md:col-span-7">
                    <div className="px-20 py-12">
                        <h1 className="text-xl uppercase font-bold">
                            Tirto Kauripan
                        </h1>
                        <div className="mt-20">
                            <h2 className="text-3xl font-semibold tracking-widest">
                                USER LOGIN
                            </h2>
                            <p className="mt-2 font-semibold">
                                Welcome to the website
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 max-w-[400px]"
                        >
                            <div className="relative z-0 mt-4">
                                <input
                                    type="text"
                                    id="username"
                                    className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    {...register('phone', {
                                        required: true,
                                    })}
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute text-base text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Username
                                </label>
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    Username is required
                                </p>
                            )}
                            <div className="relative z-0 mt-4">
                                <input
                                    type="password"
                                    id="password"
                                    className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    {...register('password', {
                                        required: true,
                                    })}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password
                                </label>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    Password is required
                                </p>
                            )}
                            <Button type="submit" isloading={isLoading ? 1 : 0}>
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
