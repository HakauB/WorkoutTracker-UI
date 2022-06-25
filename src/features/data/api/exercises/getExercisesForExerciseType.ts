import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Exercise } from "../../types";

type GetExercisesForExerciseTypeParams = {
    exerciseTypeId: string;
}

export const getExercisesForExerciseType = (params: GetExercisesForExerciseTypeParams): Promise<Exercise[]> => {
    return axios.get(`/exercises/?exercise_type=${params.exerciseTypeId}`);
}

export const useExercisesForExerciseType = (params: GetExercisesForExerciseTypeParams) => {
    return useQuery(
        // TODO: Don't know if this works...
        ["exercises", params],
        () => getExercisesForExerciseType(params)
    );
}