import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { WorkoutNested } from "../../types";

export const getWorkoutNested = (id: string): Promise<WorkoutNested> => {
    return axios.get(`/workoutsnested/${id}`);
}

export const useWorkoutNested = (id: string) => {
    return useQuery(
        ["workoutsnested", id],
        () => getWorkoutNested(id)
    );
}