import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseNested } from "../../types";
import moment from "moment";

export type getExercisesNestedWithParamsParams = {
    start_date?: string;
    end_date?: string;
    date_performed?: string;
}

export const getExercisesNestedWithParams = (params: getExercisesNestedWithParamsParams): Promise<ExerciseNested[]> => {
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
    return axios.get(`/exercisesnested/?${queryParams.toString()}`);
}

export const useExercisesNestedWithParams = (params: getExercisesNestedWithParamsParams) => {
    return useQuery(
        ["exercisesnested", params],
        () => getExercisesNestedWithParams(params)
    );
}