import { DatePicker, Space, Spin, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { ExerciseType } from "../../exercisetypes";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExerciseSets } from "../api/exercisesets";
import { useExerciseSetsWithParams } from "../api/exercisesets/getExerciseSetsWithParams";
import { ExerciseSet } from "../types";

type ExerciseSetTableProps = {
    startDate?: string;
    endDate?: string;
    datePerformed?: string;
}

export const ExerciseSetTable = (props: ExerciseSetTableProps) => {
    // const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSets();
    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSetsWithParams({
        start_date: props.startDate,
        end_date: props.endDate,
        date_performed: props.datePerformed,
    });
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExerciseSets || isLoadingExerciseTypes) {
        return (
            <Spin />
        )
    }

    if (!exerciseSets || !exerciseTypes) return null;

    const sortedExerciseSets = exerciseSets.sort(
        (a: ExerciseSet, b: ExerciseSet) => moment(a.date_performed).diff(moment(b.date_performed))
    );

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
            onFilter: (value: any, record: ExerciseSet) => exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === record.exercise_type)?.id === value,
        },
        {
            title: "Date Performed",
            dataIndex: "date_performed",
            key: "date_performed",
            sorter: (a: ExerciseSet, b: ExerciseSet) => moment(a.date_performed).diff(moment(b.date_performed)),
        },
        {
            title: "Reps",
            dataIndex: "reps",
            key: "reps",
        },
        {
            title: "Weight",
            dataIndex: "weight",
            key: "weight",
        },
    ]

    return (
        <Table
            dataSource={sortedExerciseSets}
            columns={columns}
            rowKey="id"
            pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number) => `Total: ${total} items`,
            }}
        />
    )
}

type ExerciseSetDisplayProps = {

}

export const ExerciseSetDisplay = (props: ExerciseSetDisplayProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [datePerformed, setDatePerformed] = useState<string>("");

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
            <ExerciseSetTable startDate={startDate} endDate={endDate} datePerformed={datePerformed} />
        </>
    )
}