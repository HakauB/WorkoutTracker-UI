import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { Exercise } from '../../types';

export type CreateExerciseDTO = {
    data: {
        workout: string;
        exercise_type: string;
        date_performed: string;
    }
}

export const createExercise = (data: CreateExerciseDTO): Promise<Exercise> => {
    return axios.post('/exercises/', data.data);
}

export const useCreateExercise = () => {
    return useMutation({
        onMutate: async (newExercise: CreateExerciseDTO) => {
            await queryClient.cancelQueries('exercises');

            const previousExercises = queryClient.getQueryData<Exercise[]>('exercises');

            queryClient.setQueryData('exercises',
                [...(previousExercises || []), newExercise.data]
            );

            return { previousExercises, newExercise };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExercises) {
                queryClient.setQueryData('exercises', context.previousExercises);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('exercises');
            openNotification({
                title: 'Success',
                message: 'Exercise created successfully',
                type: 'success'
            });
        },
        mutationFn: createExercise,
    })
}