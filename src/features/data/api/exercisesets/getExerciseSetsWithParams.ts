import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseSet } from "../../types";
import moment from "moment";

export type GetExerciseSetsWithParamsParams = {
    exercise_type?: string[];
    exercise?: string;
    start_date?: string;
    end_date?: string;
    date_performed?: string;
}

export const getExerciseSetsWithParams = (params: GetExerciseSetsWithParamsParams): Promise<ExerciseSet[]> => {
    const queryParams = new URLSearchParams();
    if (params.exercise_type) {
        params.exercise_type.map(exerciseTypeId => queryParams.append("exercise_type", exerciseTypeId));
    }
    if (params.exercise) {
        queryParams.append("exercise", params.exercise);
    }
    if (params.start_date && moment(params.start_date).isValid()) {
        queryParams.append("start_date", params.start_date);
    }
    if (params.end_date && moment(params.end_date).isValid()) {
        queryParams.append("end_date", params.end_date);
    }
    if (params.date_performed && moment(params.date_performed).isValid()) {
        queryParams.append("date_performed", params.date_performed);
    }
    return axios.get(`/exercisesets/?${queryParams.toString()}`);
}

export const useExerciseSetsWithParams = (params: GetExerciseSetsWithParamsParams) => {
    return useQuery(
        ["exercisesets", params],
        () => getExerciseSetsWithParams(params)
    );
}