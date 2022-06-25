import { axios } from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { useMutation } from "react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { WorkoutNested } from "../../types";

export type CreateWorkoutNestedDTO = {
    data: {
        name: string;
        date_performed: string;
        exercises: {
            exercise_type: string;
            date_performed: string;
            exercise_sets: {
                date_performed: string;
                reps: number;
                weight: number;
                percentage?: number;
            }
        }[]
    }
}

export const createWorkoutNested = (data: CreateWorkoutNestedDTO): Promise<WorkoutNested> => {
    return axios.post('/workoutsnested/', data.data);
}

export const useCreateWorkoutNested = () => {
    return useMutation({
        onMutate: async (newWorkoutNested: CreateWorkoutNestedDTO) => {
            await queryClient.cancelQueries('workoutsnested');

            const previousWorkoutNested = queryClient.getQueryData<WorkoutNested[]>('workoutsnested');

            queryClient.setQueryData('workoutsnested',
                [...(previousWorkoutNested || []), newWorkoutNested.data]
            );

            return { previousWorkoutNested, newWorkoutNested };
        },
        onError: (_, __, context: any) => {
            if (context?.previousWorkoutNested) {
                queryClient.setQueryData('workoutsnested', context.previousWorkoutNested);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('workoutsnested');
            openNotification({
                title: 'Success',
                message: 'Workout created successfully',
                type: 'success'
            });
        },
        mutationFn: createWorkoutNested,
    });
}