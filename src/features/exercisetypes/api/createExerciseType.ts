import { axios } from "../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../lib/react-query";
import { openNotification } from "../../../components/Notifications/Notifications";

import { ExerciseType } from "../types";

export type CreateExerciseTypeDTO = {
    data: {
        name: string;
    }
}

export const createExerciseType = (data: CreateExerciseTypeDTO): Promise<ExerciseType> => {
    return axios.post('/exercisetypes/', data.data);
}

export const useCreateExerciseType = () => {
    return useMutation({
        onMutate: async (newExerciseType: CreateExerciseTypeDTO) => {
            await queryClient.cancelQueries('exercisetypes');

            const previousExerciseTypes = queryClient.getQueryData<ExerciseType[]>('exercisetypes');

            queryClient.setQueryData('exercisetypes', 
                [...(previousExerciseTypes || []), newExerciseType.data]
            );

            return { previousExerciseTypes, newExerciseType };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExerciseTypes) {
                queryClient.setQueryData('exercisetypes', context.previousExerciseTypes);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('exercisetypes');
            openNotification({
                title: 'Success',
                message: 'Exercise type created successfully',
                type: 'success'
            });
        },
        mutationFn: createExerciseType,
    })
}