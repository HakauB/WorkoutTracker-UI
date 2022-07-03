import { DatePicker, Space, Spin, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { ExerciseType } from "../../exercisetypes";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExercisesNestedWithParams } from "../api/exercisesnested/getExercisesNestedWithParams";
import { ExerciseNested, ExerciseSet } from "../types";

type ExercisesTableProps = {
    startDate?: string;
    endDate?: string;
    datePerformed?: string;
}

export const ExercisesTable = (props: ExercisesTableProps) => {
    const { data: exercises, isLoading: isLoadingExercises } = useExercisesNestedWithParams({
        start_date: props.startDate,
        end_date: props.endDate,
        date_performed: props.datePerformed,
    });
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExercises || isLoadingExerciseTypes) {
        return (
            <Spin />
        )
    }

    if (!exercises || !exerciseTypes) return null;

    const sortedExercises = exercises.sort((a: ExerciseNested, b: ExerciseNested) => moment(a.date_performed).diff(moment(b.date_performed)));

    const columns = [
        {
            title: "Exercise Type",
            dataIndex: "exercise_type",
            key: "exercise_type",
            render: (rowExerciseType: string) => {
                const exerciseType = exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === rowExerciseType);
                return (
                    <span>
                        {exerciseType!.name}
                    </span>
                )
            },
            filters: exerciseTypes.map((exerciseType: ExerciseType) => {
                return {
                    text: exerciseType.name,
                    value: exerciseType.id,
                }
            }),
            onFilter: (value: any, record: ExerciseNested) => exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === record.exercise_type)?.id === value,
        },
        {
            title: "Date Performed",
            dataIndex: "date_performed",
            key: "date_performed",
            sorter: (a: ExerciseNested, b: ExerciseNested) => new Date(a.date_performed).getTime() - new Date(b.date_performed).getTime(),
        },
        {
            title: "Exercise Sets",
            dataIndex: "exercise_sets",
            key: "exercise_sets",
            render: (rowExerciseSets: ExerciseSet[]) => {
                return (
                    <Table 
                        columns={[
                            {
                                title: "Reps",
                                dataIndex: "reps",
                                key: "reps",
                            },
                            {
                                title: "Weight",
                                dataIndex: "weight",
                                key: "weight",
                            }
                        ]}
                        dataSource={rowExerciseSets}
                        pagination={false}
                    />
                )
            }
        }
    ]

    return (
        <Table
            dataSource={sortedExercises}
            columns={columns}
            rowKey="id"
            pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number) => `Total: ${total} items`,
            }}
            sticky
        />
    )
}

type ExercisesDisplayProps = {

}

export const ExercisesDisplay = (props: ExercisesDisplayProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [datePerformed] = useState<string>("");

    return (
        <>
            <Space
                direction='horizontal'
                style={{
                    marginBottom: '20px',
                }}
            >
                Dates:
                <DatePicker
                    placeholder="Start Date"
                    onChange={(date: any, dateString: string) => {
                        if (date?.isValid()) {
                            setStartDate((moment(dateString).format('YYYY-MM-DD')));
                        } else {
                            setStartDate("");
                        }
                    }}
                />
                -
                <DatePicker
                    placeholder="End Date"
                    onChange={(date: any, dateString: string) => {
                        if (date?.isValid()) {
                            setEndDate((moment(dateString).format('YYYY-MM-DD')));
                        } else {
                            setEndDate("");
                        }
                    }}
                />
            </Space>
            <ExercisesTable startDate={startDate} endDate={endDate} datePerformed={datePerformed} />
        </>
    )
}