import { axios } from "../../../../lib/axios";
import { useQuery } from "react-query";

import { ExerciseNested } from "../../types";

export const getExercisesNested = (): Promise<ExerciseNested[]> => {
    return axios.get("/exercisesnested/");
}

export const useExercisesNested = () => {
    return useQuery(
        "exercisesnested",
        getExercisesNested
    );
}