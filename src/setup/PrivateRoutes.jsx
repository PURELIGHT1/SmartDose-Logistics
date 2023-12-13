import { Outlet, useLocation, useNavigate } from "react-router";
import { ROUTES } from "../helper/constanta/routes";
import useAuthStore from "./store/useAuthStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('token');
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (token === 'undefined') {
      setUser(null);
      Cookies.remove('token');
      localStorage.removeItem('user');
      return;
    }

    if (!token && user) {
      setUser(null);
      localStorage.removeItem('user');
      return;
    }

    if (!user || !token) {
      navigate(ROUTES.LOGIN, {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [location.pathname, user, token, navigate, setUser]);

  return <Outlet />;
};

PrivateRoutes.propTypes = {};

export default PrivateRoutes;
