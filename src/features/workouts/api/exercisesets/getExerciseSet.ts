import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseSet } from "../../types";

export const getExerciseSet = (id: string): Promise<ExerciseSet> => {
    return axios.get(`/exercisesets/${id}`);
}

export const useExerciseSet = (id: string) => {
    return useQuery(
        ["exercisesets", id],
        () => getExerciseSet(id)
    );
}