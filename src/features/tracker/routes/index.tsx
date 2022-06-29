import { Routes, Route } from 'react-router-dom';
import { WorkoutTracker } from './WorkoutTracker';

export const TrackerRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<WorkoutTracker />} />
            <Route path=":initial_date" element={<WorkoutTracker />} />
        </Routes>
    )
}