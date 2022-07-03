import { Suspense } from 'react';
import { Spin } from 'antd';
// import { Calendar } from 'antd';
import { Outlet } from 'react-router-dom';

import { MainLayout } from '../components/Layout/MainLayout';
import { lazyImport } from '../utils/lazyImport';
import { NoPageFound } from '../components/Error/NoPageFound';
import { LoggedOut } from '../components/LoggedOut/LoggedOut';

const { UserRoutes } = lazyImport(() => import('../features/users'), 'UserRoutes');
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
            { path: 'user/*', element: <UserRoutes /> },
            { path: 'exercisetypes/*', element: <ExerciseTypesRoutes /> },
            { path: 'data/*', element: <DataRoutes /> },
            { path: 'tracker/*', element: <TrackerRoutes /> },
            { path: 'charts/*', element: <ChartRoutes /> },
            { path: '', element: <Calendar /> },
            { path: '*', element: <NoPageFound /> },
        ]
    },
    {
        path: '/logout',
        element: <LoggedOut />,
    }
]