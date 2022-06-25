import { axios } from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { useMutation } from "react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { WorkoutNested } from "../../types";

export type DeleteWorkoutNestedDTO = {
    workoutId: string;
}

export const deleteWorkoutNested = (data: DeleteWorkoutNestedDTO) => {
    return axios.delete(`/workoutsnested/${data.workoutId}`);
}

export const useDeleteWorkoutNested = (data: DeleteWorkoutNestedDTO) => {
    return useMutation({
        onMutate: async (deletedWorkoutNested: DeleteWorkoutNestedDTO) => {
            await queryClient.cancelQueries('workoutsnested');

            const previousWorkoutsNested = queryClient.getQueryData<WorkoutNested[]>('workoutsnested');

            queryClient.setQueryData(
                'workoutsnested',
                previousWorkoutsNested?.filter(
                    (workoutNested) => workoutNested.id !== deletedWorkoutNested.workoutId
                )
            );

            return { previousWorkoutsNested, deletedWorkoutNested };
        },
        onError: (_, __, context: any) => {
            if (context?.previousWorkoutsNested) {
                queryClient.setQueryData('workoutsnested', context.previousWorkoutsNested);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('workoutsnested');
            openNotification({
                title: 'Success',
                message: 'Workout deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteWorkoutNested,
    })
}