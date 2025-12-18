import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../Home';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Home/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default AppRoutes;