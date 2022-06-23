import { axios } from "../../../lib/axios";
import { useMutation } from "react-query";

import { openNotification } from "../../../components/Notifications/Notifications";

import { User } from "../types";
import { queryClient } from "../../../lib/react-query";

export type DeleteUserDTO = {
    id: string;
}

export const deleteUser = (data: DeleteUserDTO): Promise<User> => {
    return axios.delete(`/users/${data.id}/`);
}

export const useDeleteUser = (id: string) => {
    return useMutation(
        ['users', id],
        () => deleteUser({ id }),
        {
            onMutate: async (user: User) => {
                await queryClient.cancelQueries('users');

                const previousUsers = queryClient.getQueryData<User[]>('users');
                queryClient.setQueryData(['users'], previousUsers?.filter(u => u.id !== user.id));

                return { previousUsers };
            },
            onSuccess: () => {
                queryClient.invalidateQueries('users');
                openNotification({
                    type: "success",
                    message: "User was deleted successfully",
                    title: "User deleted"
                });
            },
            onError: (_, __, context: any) => {
                if (context?.previousUsers) {
                    queryClient.setQueryData(['users'], context.previousUsers);
                }
                openNotification({
                    type: "error",
                    message: context.error.response.data.detail,
                    title: "Error"
                });
            },
        }
    );
}