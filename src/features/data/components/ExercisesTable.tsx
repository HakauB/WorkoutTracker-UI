import { Spin, Table } from "antd";
import { ExerciseType } from "../../exercisetypes";
import { getExerciseType } from "../../exercisetypes/api/getExerciseType";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExercisesNested } from "../api/exercisesnested/getExercisesNested";
import { ExerciseNested } from "../types";

type ExercisesTableProps = {

}

export const ExercisesTable = (props: ExercisesTableProps) => {
    const { data: exercises, isLoading: isLoadingExercises } = useExercisesNested();
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExercises) {
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

    if (!exercises) return null;

    return (
        <Table
            dataSource={exercises}
            columns={[
                {
                    title: 'Exercise Type', dataIndex: 'exercise_type', key: 'exercise_type', render: (exercise_type: any) => <span>{
                        exerciseTypes!.find((exerciseType: ExerciseType) => exerciseType.id === exercise_type)!.name
                    }</span>,
                    filters: exerciseTypes!.map((exerciseType: ExerciseType) => ({ text: exerciseType.name, value: exerciseType.id })),
                    onFilter: (value: any, record: ExerciseNested) => exerciseTypes?.find((exerciseType: ExerciseType) => exerciseType.id === record.exercise_type)?.id === value,
                },
                { title: 'Date', dataIndex: 'date_performed', key: 'date_performed' },
                {
                    title: 'Sets', dataIndex: 'exercise_sets', key: 'exercise_sets', render: (sets: any) => {
                        return (
                            <Table
                                columns={[
                                    { title: 'Reps', dataIndex: 'reps', key: 'reps' },
                                    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
                                    { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' },
                                ]}
                                dataSource={sets}
                                pagination={false}
                            />
                        )
                    }
                },
            ]}
        />
    )
}