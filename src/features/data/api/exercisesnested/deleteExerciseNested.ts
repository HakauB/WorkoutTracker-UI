// TODO: May not need this file. Probably good it exists for cahce purposes.

import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { ExerciseNested } from "../../types";

export type DeleteExerciseNestedDTO = {
    exerciseId: string;
}

export const deleteExerciseNested = (data: DeleteExerciseNestedDTO) => {
    return axios.delete(`/exercisesnested/${data.exerciseId}`);
}

export const useDeleteExerciseNested = () => {
    return useMutation({
        onMutate: async (deletedExerciseNested: DeleteExerciseNestedDTO) => {
            await queryClient.cancelQueries('exercisesnested');

            const previousExercisesNested = queryClient.getQueryData<ExerciseNested[]>('exercisesnested');

            queryClient.setQueryData(
                'exercisesnested',
                previousExercisesNested?.filter(
                    (exerciseNested) => exerciseNested.id !== deletedExerciseNested.exerciseId
                )
            );

            return { previousExercisesNested, deletedExerciseNested };
        },
        onError: (_, __, context: any) => {
            if (context?.previousExercisesNested) {
                queryClient.setQueryData('exercisesnested', context.previousExercisesNested);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('exercisesnested');
            openNotification({
                title: 'Success',
                message: 'Exercise deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteExerciseNested,
    })
}