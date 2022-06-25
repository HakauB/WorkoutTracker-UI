import { axios } from "../../../../lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { openNotification } from "../../../../components/Notifications/Notifications";

import { ExerciseSet } from "../../types";

export type DeleteExerciseSetDTO = {
    exerciseSetId: string;
}

export const deleteExerciseSet = (data: DeleteExerciseSetDTO) => {
    return axios.delete(`/exercisesets/${data.exerciseSetId}`);
}

export const useDeleteExerciseSet = () => {
    return useMutation({
        onMutate: async (deletedExerciseSet: DeleteExerciseSetDTO) => {
            await queryClient.cancelQueries('exercisesets');

            const previousExerciseSets = queryClient.getQueryData<ExerciseSet[]>('exercisesets');

            queryClient.setQueryData(
                'exercisesets',
                previousExerciseSets?.filter(
                    (exerciseSet) => exerciseSet.id !== deletedExerciseSet.exerciseSetId
                )
            );

            return { previousExerciseSets, deletedExerciseSet };
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
                message: 'Exercise set deleted successfully',
                type: 'success'
            });
        },
        mutationFn: deleteExerciseSet,
    })
}