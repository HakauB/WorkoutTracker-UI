import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { ExerciseSet } from '../../types';

export type CreateExerciseSetDTO = {
    data: {
        date_performed: string;
        exercise_type: string;
        exercise: string;
        reps: number;
        weight: number;
        percentage?: number;
    }
}

export const createExerciseSet = (data: CreateExerciseSetDTO): Promise<ExerciseSet> => {
    return axios.post('/exercisesets/', data.data);
}

export const useCreateExerciseSet = () => {
    return useMutation({
        onMutate: async (newExerciseSet: CreateExerciseSetDTO) => {
            await queryClient.cancelQueries('exercisesets');

            const previousExerciseSets = queryClient.getQueryData<ExerciseSet[]>('exercisesets');
            
            queryClient.setQueryData('exercisesets',
                [...(previousExerciseSets || []), newExerciseSet.data]
            );

            return { previousExerciseSets, newExerciseSet };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExerciseSets) {
                queryClient.setQueryData('exercisesets', context.previousExerciseSets);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('exercisesets');
            openNotification({
                title: 'Success',
                message: 'Exercise set created successfully',
                type: 'success'
            });
        },
        mutationFn: createExerciseSet,
    })
}