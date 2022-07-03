import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { WorkoutNested } from "../../types";

export const getWorkoutsNested = (): Promise<WorkoutNested[]> => {
    return axios.get("/workoutsnested/");
}

export const useWorkoutsNested = () => {
    return useQuery(
        "workoutsnested",
        getWorkoutsNested
    );
}