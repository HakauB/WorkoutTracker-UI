import { Spin, Table } from "antd";
import { ExerciseType } from "../../exercisetypes";
import { getExerciseType } from "../../exercisetypes/api/getExerciseType";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExerciseSets } from "../api/exercisesets";
import { ExerciseSet } from "../types";

type ExerciseSetTableProps = {

}

export const ExerciseSetTable = (props: ExerciseSetTableProps) => {
    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSets();
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExerciseSets || isLoadingExerciseTypes) {
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

    if (!exerciseSets) return null;
    if (!exerciseTypes) return null;

    return (
        <Table 
            dataSource={exerciseSets}
            columns={[
                {
                    title: "Exercise Type",
                    dataIndex: "exercise_type",
                    key: "exercise_type",
                    render: (exerciseTypeId: string) => <span>
                        {exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === exerciseTypeId)!.name}
                    </span>,
                    filters: exerciseTypes.map((exerciseType: ExerciseType) => ({ text: exerciseType.name, value: exerciseType.id })),
                    onFilter: (value: any, record: ExerciseSet) => exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === record.exercise_type)?.id === value,
                },  
                { 
                    title: "Date", 
                    dataIndex: "date_performed", 
                    key: "date_performed",
                     
                },
                { title: "Reps", dataIndex: "reps", key: "reps" },
                { title: "Weight", dataIndex: "weight", key: "weight" },
                { title: "Percentage", dataIndex: "percentage", key: "percentage" },
            ]}
        />
    )
}