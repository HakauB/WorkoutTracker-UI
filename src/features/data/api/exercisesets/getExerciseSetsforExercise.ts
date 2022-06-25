import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseSet } from "../../types";

export type GetExerciseSetsForExerciseParams = {
    exerciseId: string;
}

export const getExerciseSetsForExercise = (params: GetExerciseSetsForExerciseParams): Promise<ExerciseSet[]> => {
    return axios.get(`/exercisesets/?exercise=${params.exerciseId}`);
}

export const useExerciseSetsForExercise = (params: GetExerciseSetsForExerciseParams) => {
    return useQuery(
        // TODO: Don't know if this works...
        ["exercisesets", params],
        () => getExerciseSetsForExercise(params)
    );
}