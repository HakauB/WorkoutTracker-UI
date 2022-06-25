import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Workout } from "../../types";

export const getWorkout = (id: string): Promise<Workout> => {
    return axios.get(`/workouts/${id}`);
}

export const useWorkout = (id: string) => {
    return useQuery(
        ["workouts", id],
        () => getWorkout(id)
    );
}