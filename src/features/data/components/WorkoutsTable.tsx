import { Card, List, Spin, Table } from "antd";
import { ExerciseType } from "../../exercisetypes";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExercises, useExercisesForWorkout } from "../api/exercises";
import { useExerciseSets } from "../api/exercisesets";
import { useWorkouts } from "../api/workouts";
import { Exercise, ExerciseSet, Workout } from "../types";

type WorkoutsListProps = {

}

export const WorkoutsList = (props: WorkoutsListProps) => {
    const { data: workouts, isLoading: isLoadingWorkouts } = useWorkouts();
    const { data: exercises, isLoading: isLoadingExercises } = useExercises();
    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSets();

    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingWorkouts || isLoadingExercises || isLoadingExerciseSets || isLoadingExerciseTypes) {
        return (
            <Spin
                style={{
                    width: "100%",
                    // maxWidth: "600px",
                    // margin: "0 auto",
                }}
            />
        )
    }

    if (!workouts) return null;

    const mapWorkoutsToListItems = (workouts: Workout[], exercises: Exercise[], exerciseSets: ExerciseSet[], exerciseTypes: ExerciseType[]) => {
        // return in format:
        // [
        //     {
        //         key: "1",
        //         title: "Workout 1",
        //         date_performed: "2020-01-01",
        //         exercises: [
        //             {
        //                 key: "1",
        //                 exercise_type: "Exercise Type 1"
        //                 sets: [
        //                     {
        //                         key: "1",
        //                         reps: 10,
        //                         weight: 100,
        //                         percentage: 100,
        //                      }
        //                 ]
        //             }
        //         ]
        //     }
        // ]

        const mappedWorkouts = workouts.map((workout: Workout) => {
            const mappedExercises = exercises.filter((exercise: Exercise) => exercise.workout === workout.id);
            const mappedExerciseSets = exerciseSets.filter((exerciseSet: ExerciseSet) => mappedExercises.some((exercise: Exercise) => exercise.id === exerciseSet.exercise));
            const mappedExerciseTypes = exerciseTypes.filter((exerciseType: ExerciseType) => mappedExercises.some((exercise: Exercise) => exercise.exercise_type === exerciseType.id));

            const mappedExercisesForWorkout = mappedExercises.map((exercise: Exercise) => {
                const mappedExerciseSetsForExercise = mappedExerciseSets.filter((exerciseSet: ExerciseSet) => exerciseSet.exercise === exercise.id);
                const mappedExerciseTypesForExercise = exerciseTypes.filter((exerciseType: ExerciseType) => exercise.exercise_type === exerciseType.id);

                return {
                    id: exercise.id,
                    exercise_type: mappedExerciseTypesForExercise[0].name,
                    sets: mappedExerciseSetsForExercise.map((exerciseSet: ExerciseSet) => {
                        return {
                            id: exerciseSet.id,
                            reps: exerciseSet.reps,
                            weight: exerciseSet.weight,
                            percentage: exerciseSet.percentage,
                        }
                    })
                }
            })

            return {
                id: workout.id,
                name: workout.name,
                date_performed: workout.date_performed,
                exercises: mappedExercisesForWorkout,
            }
        })

        return mappedWorkouts;
    }

    const listItems = mapWorkoutsToListItems(workouts, exercises!, exerciseSets!, exerciseTypes!);

   //const columns = [
   //    {
   //        title: "Name",
   //        dataIndex: "name",
   //        key: "name",
   //    },
   //    {
   //        title: "Date Performed",
   //        dataIndex: "date_performed",
   //        key: "date_performed",
   //    },
   //    {
   //        title: "Exercises",
   //        dataIndex: "exercises",
   //        key: "exercises",
   //        render: (exercises: any) => {
   //            return (
   //                <List
   //                    dataSource={exercises}
   //                    renderItem={(exercise: any) => {
   //                        return (
   //                            <List.Item>
   //                                <List.Item.Meta
   //                                    title={exercise.exercise_type}
   //                                    description={exercise.sets.map((set: ExerciseSet) => {
   //                                        return `${set.reps} reps @ ${set.weight}kg `
   //                                    })}
   //                                />
   //                            </List.Item>
   //                        )
   //                    }}
   //                />
   //            )
   //        }
   //    }
   //]

    return (
        <List 
            dataSource={listItems}
            renderItem={(workout: any) => {
                return (
                    <Card
                        title={workout.name}
                        extra={workout.date_performed}
                        style={{
                            // width: "100%",
                            // maxWidth: "600px",
                        }}
                    >
                        <Table
                            columns={
                                [
                                    {
                                        title: "Exercise Type",
                                        dataIndex: "exercise_type",
                                        key: "exercise_type",
                                    },
                                    {
                                        title: "Sets",
                                        dataIndex: "sets",
                                        key: "sets",
                                        render: (sets: any) => {
                                            return (
                                                <Table
                                                    size="small"
                                                    columns={
                                                        [
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
                                                            {
                                                                title: "Percentage",
                                                                dataIndex: "percentage",
                                                                key: "percentage",
                                                            },
                                                        ]
                                                    }
                                                    dataSource={sets}
                                                    pagination={false}
                                                />
                                            )
                                        }
                                    },
                                ]
                            }
                            dataSource={workout.exercises}
                            pagination={false}
                        />
                    </Card>
                )
            }}
            style={{
                // width: "100%",
                // center the list horizontally
                // margin: "0 auto",
            }}
        />
    )

}