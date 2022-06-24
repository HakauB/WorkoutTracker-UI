import { useMutation } from "react-query";

import { axios } from "../../../lib/axios";
import { openNotification } from "../../../components/Notifications/Notifications";

import { ExerciseType } from "../types";
import { queryClient } from "../../../lib/react-query";

type DeleteExerciseTypeDTO = {
    exerciseTypeId: string;
}

export const deleteExerciseType = (data: DeleteExerciseTypeDTO): Promise<ExerciseType> => {
    return axios.delete(`/exercisetypes/${data.exerciseTypeId}`);
}

export const useDeleteExerciseType = () => {
    return useMutation({
        onMutate: async (deletedExerciseType: DeleteExerciseTypeDTO) => {
            await queryClient.cancelQueries('exercisetypes');

            const previousExerciseTypes = queryClient.getQueryData<ExerciseType[]>('exercisetypes');

            queryClient.setQueryData(
                'exercisetypes',
                previousExerciseTypes?.filter(
                    (exerciseType) => exerciseType.id !== deletedExerciseType.exerciseTypeId
                )
            );

            return { previousExerciseTypes, deletedExerciseType };
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
                message: 'Exercise type deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteExerciseType,
    })
}