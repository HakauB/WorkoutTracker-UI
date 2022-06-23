import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../components/Landing/Landing';

import { useAuth } from '../lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
    const auth = useAuth();

    const commonRoutes = [{ path: '/', exact: true, element: <LandingPage /> }];

    const routes = auth.user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>
}