import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthStore from '../../setup/store/useAuthStore';
import useLogin from './hook/useLogin';
import { ROUTES } from '../../helper/constanta/routes';
import { useEffect, useState } from 'react';
import './style.css';
import Swal from 'sweetalert2';
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
        mutate(data,{
            onSuccess: (res) => {
                if(res.data.role === 'USER'){
                    navigate(ROUTES.PRODUK);
                }
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Gagal Login',
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
    
        });
    };

    const redirectPath = location.state?.from || ROUTES.DASHBOARD;

    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    useEffect(() => {
        if (user) {
            if(user.role === 'USER'){
                navigate(ROUTES.PRODUK);
            }
            console.log(user.role);
            // navigate(redirectPath);
        }
    }, [user, navigate, redirectPath]);

    if (user) return;
    return (
        <div className={`bg-blue-300 container ${isSignUpMode ? 'sign-up-mode' : ''}`} >
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Phone Number(628xxxxxx)" 
                            {...register('phone', {
                                required: true,
                            })}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                Phone Number is required
                            </p>
                        )}
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password"
                             {...register('password', {
                                required: true,
                            })} />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                Password is required
                            </p>
                        )}
                        <Button 
                            type="submit"
                            className={`py-3 px-8 text-sm uppercase`}
                            isloading={isLoading ? 1 : 0}
                        >
                            Login
                        </Button>
                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <Button 
                            type="submit"
                            className={`py-3 px-8 text-sm uppercase`}
                            isloading={isLoading ? 1 : 0}
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                        ex ratione. Aliquid!
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                        Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                        Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;
