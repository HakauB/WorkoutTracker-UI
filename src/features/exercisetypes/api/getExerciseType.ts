import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseType } from "../types";

export const getExerciseType = (id: string): Promise<ExerciseType> => {
    return axios.get(`/exercisetypes/${id}`);
}

export const useExerciseType = (id: string) => {
    return useQuery(
        ['exercisetypes', id],
        () => getExerciseType(id)
    );
}