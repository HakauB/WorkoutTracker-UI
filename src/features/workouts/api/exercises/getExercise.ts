import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Exercise } from "../../types";

export const getExercise = (id: string): Promise<Exercise> => {
    return axios.get(`/exercises/${id}`);
}

export const useExercise = (id: string) => {
    return useQuery(
        ["exercises", id],
        () => getExercise(id)
    );
}