import { Suspense } from 'react';
import { Spin } from 'antd';
// import { Calendar } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '../components/Layout/MainLayout';
import { lazyImport } from '../utils/lazyImport';

const { UserProfile } = lazyImport(() => import('../features/users'), 'UserProfile');
const { ExerciseTypesRoutes } = lazyImport(() => import('../features/exercisetypes'), 'ExerciseTypesRoutes');
const { DataRoutes } = lazyImport(() => import('../features/data'), 'DataRoutes');
const { TrackerRoutes } = lazyImport(() => import('../features/tracker'), 'TrackerRoutes');
const { ChartRoutes } = lazyImport(() => import('../features/charts'), 'ChartRoutes');
const { Calendar } = lazyImport(() => import('../features/calendar'), 'Calendar');


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
            { path: 'exercisetypes/*', element: <ExerciseTypesRoutes /> },
            { path: 'data/*', element: <DataRoutes /> },
            { path: 'tracker/*', element: <TrackerRoutes /> },
            { path: 'charts/*', element: <ChartRoutes /> },
            { path: '', element: <Calendar /> },
        ]
    }
]