import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseNested } from "../../types";

export const getExerciseNested = (id: string): Promise<ExerciseNested> => {
    return axios.get(`/exercisesnested/${id}`);
}

export const useExerciseNested = (id: string) => {
    return useQuery(
        ["exercisesnested", id],
        () => getExerciseNested(id)
    );
}