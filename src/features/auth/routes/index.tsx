import { Route, Routes } from 'react-router-dom';
import { NoPageFound } from '../../../components/Error/NoPageFound';
import { NoPageFoundWithLoginRegister } from '../../../components/Error/NoPageFoundWithLoginRegister';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='*' element={<NoPageFoundWithLoginRegister />} />
        </Routes>
    )
};