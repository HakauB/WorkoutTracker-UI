import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { Exercise } from "../../types";

export const getExercises = (): Promise<Exercise[]> => {
    return axios.get("/exercises/");
}

export const useExercises = () => {
    return useQuery(
        "exercises",
        getExercises
    );
}