import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { WorkoutNested } from "../../types";
import moment from "moment";

export type getWorkoutsNestedWithParamsParams = {
    start_date?: string;
    end_date?: string;
    date_performed?: string;
}

export const getWorkoutsNestedWithParams = (params: getWorkoutsNestedWithParamsParams): Promise<WorkoutNested[]> => {
    const queryParams = new URLSearchParams();
    if (params.start_date && moment(params.start_date).isValid()) {
        queryParams.append("start_date", params.start_date);
    }
    if (params.end_date && moment(params.end_date).isValid()) {
        queryParams.append("end_date", params.end_date);
    }
    if (params.date_performed && moment(params.date_performed).isValid()) {
        queryParams.append("date_performed", params.date_performed);
    }
    return axios.get(`/workoutsnested/?${queryParams.toString()}`);
}

export const useWorkoutsNestedWithParams = (params: getWorkoutsNestedWithParamsParams) => {
    return useQuery(
        ["workoutsnested", params],
        () => getWorkoutsNestedWithParams(params)
    );
}