import { Space } from "antd";
import { ExerciseType } from "../types";

type DetailExerciseTypeProps = {
    exerciseType: ExerciseType;
}

export const DetailExerciseType = (props: DetailExerciseTypeProps) => {
    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            <h1>{props.exerciseType.name}</h1>
        </Space>
    )
}