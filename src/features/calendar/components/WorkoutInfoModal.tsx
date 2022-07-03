import { Card, List, Modal, Spin } from "antd";
import { useModalStore } from "../../../stores/modals";
import { useWorkoutNested } from "../../data";
import { Workout } from "../../data/types";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";

type WorkoutInfoModalProps = {
    // onClose: () => void;
    workout: Workout;
}

export const WorkoutInfoModal = (props: WorkoutInfoModalProps) => {
    const { data: workoutData, isLoading: isLoadingWorkoutData } = useWorkoutNested(props.workout.id);
    const { data: exerciseTypes } = useExerciseTypes();
    const { isCalendarWorkoutInfoModalVisible, hideCalendarWorkoutInfoModal } = useModalStore();

    if (isLoadingWorkoutData) {
        return <Spin />;
    }

    if (!workoutData) {
        return null;
    }

    return (
        <Modal
            title={props.workout.name + ' - ' + props.workout.date_performed}
            visible={isCalendarWorkoutInfoModalVisible}
            onCancel={hideCalendarWorkoutInfoModal}
            onOk={hideCalendarWorkoutInfoModal}
        >
            {workoutData.exercises.map((exercise) => (
                <Card
                    title={exerciseTypes?.find(exerciseType => exerciseType.id === exercise.exercise_type)?.name}
                    style={{
                        marginBottom: '16px',
                    }}
                >
                    {exercise.exercise_sets.map((set) => (
                        <List>
                            {/* <List.Item
                                key={set.id}
                            > */}
                                <List.Item.Meta
                                    key={set.id}
                                    title={set.reps + ' reps of ' + set.weight}
                                />
                            {/* </List.Item> */}
                        </List>
                    ))}
                </Card>
            ))}
        </Modal>
    )
}