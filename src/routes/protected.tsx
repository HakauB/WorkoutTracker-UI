import { Suspense } from 'react';
import { Spin } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '../components/Layout/MainLayout';
import { lazyImport } from '../utils/lazyImport';

const { UserProfile } = lazyImport(() => import('../features/users'), 'UserProfile');

const App = () => {
    return (
        <MainLayout>
            <Suspense fallback={<Spin />}>
                <Outlet />
            </Suspense>
        </MainLayout>
    );
}

export const protectedRoutes = [
    {
        path: '/app',
        element: <App />,
        children: [
            { path: 'profile', element: <UserProfile /> },
        ]
    }
]