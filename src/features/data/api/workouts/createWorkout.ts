import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { Workout } from "../../types";

export type CreateWorkoutDTO = {
    data: {
        name: string;
        date_performed: string;
    }
}

export const createWorkout = (data: CreateWorkoutDTO): Promise<Workout> => {
    return axios.post('/workouts/', data.data);
}

export const useCreateWorkout = () => {
    return useMutation({
        onMutate: async (newWorkout: CreateWorkoutDTO) => {
            await queryClient.cancelQueries('workouts');

            const previousWorkouts = queryClient.getQueryData<Workout[]>('workouts');

            queryClient.setQueryData('workouts',
                [...(previousWorkouts || []), newWorkout.data]
            );

            return { previousWorkouts, newWorkout };
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
                message: 'Workout created successfully',
                type: 'success'
            });
        },
        mutationFn: createWorkout,
    })
}