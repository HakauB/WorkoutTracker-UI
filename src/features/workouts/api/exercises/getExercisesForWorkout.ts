import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Exercise } from "../../types";

type GetExercisesForWorkoutParams = {
    workoutId: string;
}

export const getExercisesForWorkout = (params: GetExercisesForWorkoutParams): Promise<Exercise[]> => {
    return axios.get(`/exercises/?workout=${params.workoutId}`);
}

export const useExercisesForWorkout = (params: GetExercisesForWorkoutParams) => {
    // TODO: Don't know if this works...
    return useQuery(
        ['exercises', params],
        () => getExercisesForWorkout(params)
    );
}