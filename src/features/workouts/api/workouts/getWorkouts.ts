import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Workout } from "../../types";

export const getWorkouts = (): Promise<Workout[]> => {
    return axios.get("/workouts/");
}

export const useWorkouts = () => {
    return useQuery(
        "workouts",
        getWorkouts
    );
}