// export * from './UserProfile';
import { Routes, Route } from 'react-router-dom';
import { UserProfile } from './UserProfile';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="profile" element={<UserProfile />} />
        </Routes>
    );
}