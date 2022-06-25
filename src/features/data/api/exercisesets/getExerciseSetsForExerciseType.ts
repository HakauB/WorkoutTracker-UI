import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseSet } from "../../types";

export type GetExerciseSetsForExerciseTypeParams = {
    exerciseTypeId: string;
}

export const getExerciseSetsForExerciseType = (params: GetExerciseSetsForExerciseTypeParams): Promise<ExerciseSet[]> => {
    return axios.get(`/exercisesets/?exercise_type=${params.exerciseTypeId}`);
}

export const useExerciseSetsForExerciseType = (params: GetExerciseSetsForExerciseTypeParams) => {
    return useQuery(
        ["exercisesets", params],
        () => getExerciseSetsForExerciseType(params)
    );
}