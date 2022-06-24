import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { Exercise } from "../../types";

export type DeleteExerciseDTO = {
    exerciseId: string;
}

export const deleteExercise = (data: DeleteExerciseDTO): Promise<Exercise> => {
    return axios.delete(`/exercises/${data.exerciseId}`);
}

export const useDeleteExercise = () => {
    return useMutation({
        onMutate: async (deletedExercise: DeleteExerciseDTO) => {
            await queryClient.cancelQueries('exercises');

            const previousExercises = queryClient.getQueryData<Exercise[]>('exercises');

            queryClient.setQueryData(
                'exercises',
                previousExercises?.filter(
                    (exercise) => exercise.id !== deletedExercise.exerciseId
                )
            );

            return { previousExercises, deletedExercise };
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
                message: 'Exercise deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteExercise,
    })
}