import { axios } from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { useQuery } from "react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { WorkoutNested } from "../../types";

export const getWorkoutNested = (id: string): Promise<WorkoutNested[]> => {
    return axios.get(`/workoutsnested/${id}`);
}

export const useWorkoutNested = (id: string) => {
    return useQuery(
        ["workoutsnested", id],
        () => getWorkoutNested(id)
    );
}