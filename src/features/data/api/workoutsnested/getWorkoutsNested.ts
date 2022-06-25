import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

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