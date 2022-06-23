import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseType } from "../types";

export const getExerciseTypes = (): Promise<ExerciseType[]> => {
    return axios.get('/exercisetypes/');
}

export const useExerciseTypes = () => {
    return useQuery(
        'exercisetypes',
        getExerciseTypes
    );
}