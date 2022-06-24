import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseSet } from "../../types";

export const getExerciseSets = (): Promise<ExerciseSet[]> => {
    return axios.get("/exercisesets/");
}

export const useExerciseSets = () => {
    return useQuery(
        "exercisesets",
        getExerciseSets
    );
}