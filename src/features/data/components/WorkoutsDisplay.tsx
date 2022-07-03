import { Card, DatePicker, List, Space, Spin, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { ExerciseType } from "../../exercisetypes";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useWorkoutsNestedWithParams } from "../api/workoutsnested";
import { ExerciseNested, ExerciseSet, WorkoutNested } from "../types";

type WorkoutsTableProps = {
    startDate?: string;
    endDate?: string;
    datePerformed?: string;
}

export const WorkoutsTable = (props: WorkoutsTableProps) => {
    const { data: workouts, isLoading: isLoadingWorkouts } = useWorkoutsNestedWithParams({
        start_date: props.startDate,
        end_date: props.endDate,
        date_performed: props.datePerformed,
    });
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingWorkouts || isLoadingExerciseTypes) {
        return (
            <Spin />
        )
    }

    if (!workouts || !exerciseTypes) {
        return null;
    }

    const listItems = workouts.sort(
        (a: WorkoutNested, b: WorkoutNested) => moment(a.date_performed).diff(moment(b.date_performed))
    ).map((workout: WorkoutNested) => {
        const mappedExercises = workout.exercises.map((exercise: ExerciseNested) => {
            const mappedExerciseType = exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === exercise.exercise_type);

            return {
                id: exercise.id,
                exercise_type: mappedExerciseType!.name,
                exercise_sets: exercise.exercise_sets.map((exerciseSet: ExerciseSet) => {
                    return {
                        id: exerciseSet.id,
                        reps: exerciseSet.reps,
                        weight: exerciseSet.weight,
                        percentage: exerciseSet.percentage,
                    }
                }),
            }
        });

        return {
            id: workout.id,
            name: workout.name,
            date_performed: workout.date_performed,
            exercises: mappedExercises,
        }
    });

    console.log(listItems);

    return (
        <List
            grid={{
                gutter: 32,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 4,
            }}
            dataSource={listItems}
            renderItem={(item: any) => (
                <List.Item
                    key={item.id}
                    style={{
                        // minWidth: '300px',
                    }}
                >
                    <Card
                        title={item.name}
                        extra={item.date_performed}
                        
                    >
                        <Table
                            columns={[
                                {
                                    title: "Exercise Type",
                                    dataIndex: "exercise_type",
                                    key: "exercise_type",
                                },
                                {
                                    title: "Sets",
                                    dataIndex: "exercise_sets",
                                    key: "exercise_sets",
                                    render: (sets: any) => (
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
                                                },
                                            ]}
                                            dataSource={sets}
                                            pagination={false}
                                        />
                                    )
                                },
                            ]}
                            dataSource={item.exercises}
                            pagination={false}
                        />
                    </Card>
                </List.Item>
            )}
        />
    )
}

type WorkoutsDisplayProps = {

}

export const WorkoutsDisplay = (props: WorkoutsDisplayProps) => {
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
            <WorkoutsTable startDate={startDate} endDate={endDate} datePerformed={datePerformed} />
        </>
    )
}