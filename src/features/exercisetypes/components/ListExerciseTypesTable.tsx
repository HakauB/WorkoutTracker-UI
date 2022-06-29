import { Button, Spin, Table } from "antd";
import { ExerciseType } from "../../exercisetypes";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExerciseSets } from "../../data/api/exercisesets";
import { ExerciseSet } from "../../data/types";
import { DeleteRowOutlined, DeleteOutlined } from '@ant-design/icons';
import { ConfirmDeleteExerciseTypeModal } from "./ConfirmDeleteExerciseTypeModal";
import { useState } from "react";
import { useModalStore } from "../../../stores/modals";
import { CreateExerciseTypeModal } from "./CreateExerciseTypeModal";

type ListExerciseTypesTableProps = {

}

export const ListExerciseTypesTable = (props: ListExerciseTypesTableProps) => {
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();
    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSets();
    const [exerciseTypeToDelete, setExerciseTypeToDelete] = useState<ExerciseType | null>(null);
    const { showConfirmDeleteExerciseTypeModal, showCreateExerciseTypeModal } = useModalStore();

    if (isLoadingExerciseTypes || isLoadingExerciseSets) {
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

    if (!exerciseTypes || !exerciseSets) return null;

    const columns = [
        {
            title: "Exercise Type",
            dataIndex: "exercise_type",
            key: "exercise_type",
        },
        {
            title: "First Performed",
            dataIndex: "first_date_performed",
            key: "first_date_performed",
        },
        {
            title: "Last Performed",
            dataIndex: "last_date_performed",
            key: "last_date_performed",
        },
        {
            title: "Sets Performed",
            dataIndex: "sets_performed",
            key: "sets_performed",
        },
        {
            title: "Reps Performed",
            dataIndex: "reps_performed",
            key: "reps_performed",
        },
        {
            title: "Max Weight",
            dataIndex: "max_weight",
            key: "max_weight",
        },
        {
            title: "7 Day Average",
            dataIndex: "seven_day_average",
            key: "seven_day_average",
        },
        {
            title: "30 Day Average",
            dataIndex: "thirty_day_average",
            key: "thirty_day_average",
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text: string, record: any) => (
                <Button
                    onClick={() => {
                        // console.log(record);
                        setExerciseTypeToDelete(exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === record.id)!);
                        showConfirmDeleteExerciseTypeModal();
                    }}
                    type="link"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                />
            )
        }
    ]

    const data = exerciseTypes.map((exerciseType: ExerciseType) => {
        const currExerciseSets = exerciseSets.filter((exerciseSet: ExerciseSet) => exerciseSet.exercise_type === exerciseType.id);
        const firstDatePerformed = currExerciseSets.reduce((acc: string, exerciseSet: ExerciseSet) => {
            if (exerciseSet.date_performed < acc) return exerciseSet.date_performed;
            return acc;
        }, "9999-99-99");
        const lastDatePerformed = currExerciseSets.reduce((acc: string, exerciseSet: ExerciseSet) => {
            if (exerciseSet.date_performed > acc) return exerciseSet.date_performed;
            return acc;
        }, "-");
        const setsPerformed = currExerciseSets.length;
        const repsPerformed = currExerciseSets.reduce((acc: number, exerciseSet: ExerciseSet) => acc + exerciseSet.reps, 0);
        const maxWeight = currExerciseSets.reduce((acc: number, exerciseSet: ExerciseSet) => {
            if (exerciseSet.weight > acc) return exerciseSet.weight;
            return acc;
        }, 0);
        const lastSevenDays = currExerciseSets.filter((exerciseSet: ExerciseSet) => {
            const date = new Date(exerciseSet.date_performed);
            const today = new Date();
            const diff = today.getTime() - date.getTime();
            return diff < 7 * 24 * 60 * 60 * 1000;
        });
        const lastSevenDaysAverage = lastSevenDays.reduce((acc: number, exerciseSet: ExerciseSet) => acc + exerciseSet.weight, 0) / lastSevenDays.length;
        const lastThirtyDays = currExerciseSets.filter((exerciseSet: ExerciseSet) => {
            const date = new Date(exerciseSet.date_performed);
            const today = new Date();
            const diff = today.getTime() - date.getTime();
            return diff < 30 * 24 * 60 * 60 * 1000;
        })
        const lastThirtyDaysAverage = lastThirtyDays.reduce((acc: number, exerciseSet: ExerciseSet) => acc + exerciseSet.weight, 0) / lastThirtyDays.length;
        return {
            id: exerciseType.id,
            exercise_type: exerciseType.name,
            first_date_performed: firstDatePerformed !== "9999-99-99" ? firstDatePerformed : "-",
            last_date_performed: lastDatePerformed,
            sets_performed: setsPerformed,
            reps_performed: repsPerformed,
            max_weight: maxWeight,
            seven_day_average: !isNaN(lastSevenDaysAverage) ? lastSevenDaysAverage.toFixed(2) : "-",
            thirty_day_average: !isNaN(lastThirtyDaysAverage) ? lastThirtyDaysAverage.toFixed(2) : "-",
            delete: ""
        }
    })

    return (
        <>
            <CreateExerciseTypeModal onSubmit={() => {}} />
            
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    // hideOnSinglePage: true,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    // pageSize: 15,
                    showTotal: (total: number) => `Total: ${total}`,
                }}
                loading={isLoadingExerciseTypes || isLoadingExerciseSets}
                rowKey="id"
            />
            {exerciseTypeToDelete && <ConfirmDeleteExerciseTypeModal exerciseType={exerciseTypeToDelete} onSubmit={() => setExerciseTypeToDelete(null)} onCancel={() => setExerciseTypeToDelete(null)} />}
            <Button
                type="primary"
                style={{
                    // marginTop: "10px",
                }}
                onClick={showCreateExerciseTypeModal}
            >
                Add new Exercise Type
            </Button>
        </>
    )
}