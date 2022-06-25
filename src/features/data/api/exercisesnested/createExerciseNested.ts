import { axios } from '../../../../lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '../../../../lib/react-query';
import { openNotification } from '../../../../components/Notifications/Notifications';

import { ExerciseNested, ExerciseSet } from '../../types';

export type CreateExerciseNestedDTO = {
    data: {
        date_performed: string;
        exercise_type: string;
        exercise_sets: {
            date_performed: string;
            reps: number;
            weight: number;
            percentage?: number;
        }[]
    }
}

export const createExerciseNested = (data: CreateExerciseNestedDTO): Promise<ExerciseNested> => {
    return axios.post('/exercisesnested/', data.data);
}

export const useCreateExerciseNested = () => {

    // TODO: Come back and update cache for individual components

    return useMutation({
        onMutate: async (newExerciseNested: CreateExerciseNestedDTO) => {
            await queryClient.cancelQueries('exercisesnested');

            const previousExerciseNested = queryClient.getQueryData<ExerciseNested[]>('exercisesnested');

            queryClient.setQueryData('exercisesnested',
                [...(previousExerciseNested || []), newExerciseNested.data]
            );

            return { previousExerciseNested, newExerciseNested };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExerciseNested) {
                queryClient.setQueryData('exercisesnested', context.previousExerciseNested);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('exercisesnested');
            openNotification({
                title: 'Success',
                message: 'Exercise nested created successfully',
                type: 'success'
            });
        },
        mutationFn: createExerciseNested,
    })
}