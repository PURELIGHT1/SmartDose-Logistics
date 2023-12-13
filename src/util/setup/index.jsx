import { Route, Routes } from 'react-router';
import Login from '../../pages/Login';

const RouteManager = () => {
    return (
        <>
        <Routes>
            <>
            <Route path="/" element={<Login />} />
            </>
        </Routes>
        </>
    );
};

export default RouteManager;