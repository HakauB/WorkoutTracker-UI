import { NoPageFound } from "../components/Error/NoPageFound";
import { NoPageFoundWithLoginRegister } from "../components/Error/NoPageFoundWithLoginRegister";
import { LoggedOut } from "../components/LoggedOut/LoggedOut";
import { lazyImport } from "../utils/lazyImport";
const { AuthRoutes } = lazyImport(() => import('../features/auth'), 'AuthRoutes');

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes />,
    },
    {
        path: '/logout',
        element: <LoggedOut />,
    },
    {
        path: '*',
        element: <NoPageFoundWithLoginRegister />,
    }
];