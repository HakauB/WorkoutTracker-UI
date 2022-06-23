import { Navigate, Route, Routes } from "react-router-dom";

import { ExerciseType } from "../types";
import { CreateExerciseType } from "./CreateExerciseType";
import { ExerciseTypes } from "./ExerciseTypes";
import { ExerciseTypeView } from "./ExerciseTypeView";

export const ExerciseTypesRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ExerciseTypes />} />
            <Route path="create" element={<CreateExerciseType />} />
            <Route path=":exerciseTypeId" element={<ExerciseTypeView />} />
        </Routes>
    );
}