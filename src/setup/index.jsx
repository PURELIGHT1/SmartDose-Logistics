import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Login from '../pages/Login';
import { useEffect } from 'react';
import { ROUTES } from '../helper/constanta/routes';
import NotFound from '../pages/404';
import PrivateRoutes from './PrivateRoutes';

const RouteManager = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

     useEffect(() => {
        if (pathname === '/') {
            navigate(ROUTES.DASHBOARD);
        }
    }, [pathname, navigate]);

    return (
        <>
        <Routes>
            <>
             <Route element={<PrivateRoutes allowedRoles={['USER']} />}>
                <Route path="/">

                </Route>
             </Route>
            </>
            
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
};

export default RouteManager;