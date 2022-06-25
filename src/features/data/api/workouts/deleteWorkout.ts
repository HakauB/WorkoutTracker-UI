import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { Workout } from "../../types";

export type DeleteWorkoutDTO = {
    workoutId: string;
}

export const deleteWorkout = (data: DeleteWorkoutDTO): Promise<Workout> => {
    return axios.delete(`/workouts/${data.workoutId}`);
}

export const useDeleteWorkout = () => {
    return useMutation({
        onMutate: async (deletedWorkout: DeleteWorkoutDTO) => {
            await queryClient.cancelQueries('workouts');

            const previousWorkouts = queryClient.getQueryData<Workout[]>('workouts');

            queryClient.setQueryData(
                'workouts',
                previousWorkouts?.filter(
                    (workout) => workout.id !== deletedWorkout.workoutId
                )
            );

            return { previousWorkouts, deletedWorkout };
        },
        onError: (_, __, context: any) => {
            if (context?.previousWorkouts) {
                queryClient.setQueryData('workouts', context.previousWorkouts);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('workouts');
            openNotification({
                title: 'Success',
                message: 'Workout deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteWorkout,
    })
}