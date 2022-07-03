import { useParams } from "react-router-dom";

import { Spin } from 'antd';
import { useExerciseType } from "../api/getExerciseType";
import { DetailExerciseType } from "../components/DetailExerciseType";

export const ExerciseTypeView = () => {
    const { exerciseTypeId } = useParams();
    console.log(exerciseTypeId);
    const exerciseTypeQuery = useExerciseType(exerciseTypeId ? exerciseTypeId : '');

    if (exerciseTypeQuery.isLoading) {
        return (
            <Spin
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            />
        )
    }

    if (!exerciseTypeQuery.data) return null;

    return (
        <DetailExerciseType exerciseType={exerciseTypeQuery.data} />
    )
}