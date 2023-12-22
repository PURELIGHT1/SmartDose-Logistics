import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Login from '../pages/Login';
import { useEffect } from 'react';
import { ROUTES } from '../helper/constanta/routes';
import NotFound from '../pages/404';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../pages/Dashboard/Dashboard';
import Produk from '../pages/user/Produk';

const RouteManager = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

     useEffect(() => {
        if (pathname === '/') {
            navigate("/");
        }
    }, [pathname, navigate]);

    return (
        <>
        <Routes>
            <>
             <Route element={<PrivateRoutes allowedRoles={['USER']} />}>
                <Route path="/" element={<Dashboard />}>
                    <Route path={ROUTES.PRODUK}>
                        <Route index element={<Produk />} />
                    </Route>
                </Route>
             </Route>
            </>
            <>
            {/* <Route path="/" element={<Dashboard />}/> */}
            </>
            
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
};

export default RouteManager;