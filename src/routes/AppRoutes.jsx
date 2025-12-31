import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../Home';
import Login from '../registration/Login';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../PrivateRoute';
import Register from '../registration/Register';
import ActivateAccount from '../registration/ActivateAccount';
import DashboardLayout from '../layouts/DashboardLayout';
import VillageDetails from '../pages/VillageDetails';


const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/village_details' element={<VillageDetails/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='activate/:uid/:token' element={<ActivateAccount/>}/>
                </Route>

                <Route path="dashboard" element={
                    <PrivateRoute>
                        <DashboardLayout/>
                    </PrivateRoute>}>
                    <Route index element={<Dashboard/>}/>
                </Route>

            </Routes>
        </div>
    );
};

export default AppRoutes;