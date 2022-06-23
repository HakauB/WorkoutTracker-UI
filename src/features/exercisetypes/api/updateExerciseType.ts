import { useMutation } from "react-query";

import { axios } from "../../../lib/axios";
import { openNotification } from "../../../components/Notifications/Notifications";

import { ExerciseType } from "../types";
import { queryClient } from "../../../lib/react-query";

export type UpdateExerciseTypeDTO = {
    data: {
        name: string;
    },
    exerciseTypeId: string;
}

export const updateExerciseType = (data: UpdateExerciseTypeDTO): Promise<ExerciseType> => {
    return axios.patch(`/exercisetypes/${data.exerciseTypeId}`, data.data);
}

export const useUpdateExerciseType = () => {
    return useMutation({
        onMutate: async (updatedExerciseType: UpdateExerciseTypeDTO) => {
            await queryClient.cancelQueries('exercisetypes');

            const previousExerciseType = queryClient.getQueryData<ExerciseType>([
                'exercisetypes',
                updatedExerciseType?.exerciseTypeId
            ]);

            queryClient.setQueryData(['exercisetypes', updatedExerciseType?.exerciseTypeId], {
                ...previousExerciseType,
                ...updatedExerciseType.data,
                id: updatedExerciseType.exerciseTypeId,
            });

            return { previousExerciseType, updatedExerciseType };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExerciseTypes) {
                queryClient.setQueryData(
                    ['exercisetypes', context.previousExerciseType.id],
                    context.previousExerciseType
                )
            }
        },
        onSuccess: (data: ExerciseType) => {
            queryClient.refetchQueries(['exercisetypes', data.id]);
            openNotification({
                title: 'Success',
                message: 'Exercise type updated successfully',
                type: 'success'
            });
        },
        mutationFn: updateExerciseType,
    });
}