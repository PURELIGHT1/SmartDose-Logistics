import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Login from '../pages/Login';
import { lazy, useEffect } from 'react';
import { ROUTES } from '../helper/constanta/routes';
import NotFound from '../pages/404';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../pages/Dashboard/Dashboard';
// import Produk from '../pages/user/Produk';
import Track from '../pages/user/Track';
import Order from '../pages/user/Order';
import AccessDenied from '../pages/Access';

const Produk = lazy(() => import('../pages/user/Produk'));

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
                    <Route path={ROUTES.TRACK}>
                        <Route index element={<Track />} />
                    </Route>
                    <Route path={ROUTES.ORDER}>
                        <Route index element={<Order />} />
                    </Route>
                </Route>
             </Route>
            </>
            <>
            {/* <Route path="/" element={<Dashboard />}/> */}
            </>
            
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.ACCESSDENIED} element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
};

export default RouteManager;