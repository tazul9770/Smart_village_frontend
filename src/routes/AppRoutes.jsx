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
import Profile from '../pages/Profile';
import RequestResetForm from '../profile/RequestResetForm';
import ResetPasswordPage from '../profile/ResetPasswordPage';


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
                    <Route path="password/reset/confirm/:uid/:token"element={<ResetPasswordPage />}/>
                </Route>

                {/* private route */}
                <Route path="dashboard" element={
                    <PrivateRoute>
                        <DashboardLayout/>
                    </PrivateRoute>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='profile/forgot_password' element={<RequestResetForm/>}/>
                </Route>

            </Routes>
        </div>
    );
};

export default AppRoutes;