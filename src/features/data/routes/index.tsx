import { Navigate, Route, Routes } from "react-router-dom";
import { Exercises } from "./Exercises";
import { ExerciseSets } from "./ExerciseSets";

import { Workouts } from "./Workouts";

export const DataRoutes = () => {
    return (
        <Routes>
            <Route path="workouts" element={<Workouts />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="exercisesets" element={<ExerciseSets />} />
        </Routes>
    );
}